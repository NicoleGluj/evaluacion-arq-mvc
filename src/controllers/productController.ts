import { Request, Response } from "express";
import Product from "../models/ProductModel";
import { Types } from "mongoose";

class ProductController {
  static getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.find()
      res.status(200).json({ success: true, data: products })
    } catch (e) {
      const error = e as Error
      res.json({ success: false, error: error.message })
    }
  }

  static getProducts = async (req: Request, res: Response) => {
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

      res.status(200).json({ success: true, data: product })

    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }

  static addProduct = async (req: Request, res: Response) => {
    try {
      const { body } = req
      const { title, author, publishedYear, genre, avaiable } = body

      if (!title || !author || !publishedYear || !genre || !avaiable) {
        return res.status(400).json({ success: false, error: "Datos invalidos" })
      }

      const newProduct = new Product({ title, author, publishedYear, genre, avaiable })

      await newProduct.save()

      return res.status(201).json({ success: true, data: newProduct });
    } catch (e) {
      const error = e as Error
      return res.status(500).json({ success: false, error: error.message })
    }
  }

  static updateProduct = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const { body } = req
      const { title, author, publishedYear, genre, avaiable } = body

      if (!id) {
        return res.status(400).json({ success: false, error: "ID requerido" })
      }

      if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "ID invalido" })
      }

      const updates = { title, author, publishedYear, genre, avaiable }

      const updateProduct = await Product.findByIdAndUpdate(id, updates, { new: true })

      if (!updateProduct) {
        return res.status(404).json({ success: false, error: "Producto no encontrado" })
      }

      return res.status(200).json({ success: true, data: updateProduct })

    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
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

      res.status(200).json({ succes: true, data: deleteProduct })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }
}

export default ProductController