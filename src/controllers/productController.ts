import { Request, Response } from "express";
import Product from "../models/ProductModel";
import { Types } from "mongoose";

class ProductController {
  static getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.find()
      return res.status(200).json({ success: true, data: products })
    } catch (e) {
      const error = e as Error
      return res.json({ success: false, error: error.message })
    }
  }

  static getProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ success: false, error: "ID requerido" })
      }
      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID invalido" })
      }

      const product = await Product.findById(id)

      if (!product) {
        return res.status(404).json({ success: false, error: "No se encontro el producto" })
      }

      return res.status(200).json({ success: true, data: product })

    } catch (e) {
      const error = e as Error
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  static addProduct = async (req: Request, res: Response) => {
    try {
      const { body } = req
      const { title, author, publishedYear, genre, available } = body

      if (!title || !author) {
        return res.status(400).json({ success: false, error: "Título y autor son requeridos" })
      }

      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({ success: false, error: "Título inválido" });
      }

      if (typeof author !== "string" || author.trim() === "") {
        return res.status(400).json({ success: false, error: "Autor inválido" });
      }

      const newProduct = new Product({ title, author, publishedYear, genre, available })

      await newProduct.save()

      return res.status(201).json({ success: true, data: newProduct, message: "Producto creado" });
    } catch (e) {
      const error = e as Error
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  static updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { body } = req
      const { title, author, publishedYear, genre, available } = body

      if (!id) {
        return res.status(400).json({ success: false, error: "ID requerido" })
      }

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID invalido" })
      }

      const updates = { title, author, publishedYear, genre, available }

      const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true })

      if (!updatedProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      return res.status(200).json({ success: true, data: updatedProduct })

    } catch (e) {
      const error = e as Error
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  static deleteProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({ success: false, error: "ID requerido" })
      }

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID invalido" })
      }

      const deleteProduct = await Product.findByIdAndDelete(id)

      if (!deleteProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      res.status(200).json({ success: true, data: deleteProduct })
    } catch (e) {
      const error = e as Error
      return res.status(500).json({ success: false, error: error.message })
    }
  }
}

export default ProductController