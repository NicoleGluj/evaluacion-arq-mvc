import { Router } from "express";
import ProductController from "../controllers/productController";

const productRouter = Router()

productRouter.get("/", ProductController.getAllProducts)
productRouter.get("/:id", ProductController.getProducts)
productRouter.post("/", ProductController.addProduct)
productRouter.patch("/", ProductController.updateProduct)
productRouter.delete("/", ProductController.deleteProduct)


export default productRouter