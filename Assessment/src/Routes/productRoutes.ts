import { Router } from "express";
import { addProduct, getProducts, getProduct, searchProducts, paginateProductsHandler } from "../Controllers/productController";

const productRoute = Router();

// Route to add a new product
productRoute.post("/", addProduct);

// Route to get all products
productRoute.get("/", getProducts);

// Route to get a single product by ID
productRoute.get("/:id", getProduct);

// Route to search products
productRoute.post("/search", searchProducts);


//paginate products
productRoute.post("/paginate", paginateProductsHandler);


export default productRoute;
