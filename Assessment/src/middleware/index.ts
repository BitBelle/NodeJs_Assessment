// import express, { Request, Response } from 'express';
// import Products from '../Models/productModel';


// const productRouter = express.Router();

//   interface PaginatedProducts {
//     products: Document[];
//     total: number;
//     limit: number;
//     page: number;
//     pages: number;
//     totalPublished: number;
// }

// productRouter.get("/products", async(req:Request, 
//  res:Response) => {
//   try {
//       const { featured, name, category, sortBy, priceRange, page = 1, limit = 10 } = req.query;
//         const query: Record<string, any> = {};
//         query.quantity = { $gte: 1 }
//         if (featured) {
//             query.featured = true;
//         }
//         if (category) {
//             const categoryData = await Category.findOne({ 
//              name: category });
//           if (categoryData) {
//              query.category = categoryData._id;
//            }
//         }
//         if (name) {
//             query.name = name;
//         }
//         if (priceRange) {
//             const [minPrice, maxPrice] = String(priceRange).split('-').map(Number);
//             query.price = { $gte: minPrice, $lte: maxPrice };
//         }
//         const options = { 
//             skip: (parseInt(page as string, 10) 
//             - 1) * parseInt(limit as string, 10),
//             limit: parseInt(limit as string, 10),
//             sort: sortBy === "asc" ? { name: 1 } : { name: -1 
//          },
//         };
//         const products = await Product.find(query, null, options).populate("vendor", "userName");
//         const total = await Product.countDocuments(query);
//         const totalPublished = await Product.countDocuments({ isDisplayed: true, ...query });
//         const totalPages = Math.ceil(total / parseInt(limit as string, 10));
//         const paginatedProducts: PaginatedProducts = {
//             products,
//             total,
//             limit: parseInt(limit as string, 10),
//             page: parseInt(page as string, 10),
//             pages: totalPages,
//             totalPublished
//         };
//         return res.status(200).send(paginatedProducts);
//     } catch (error) {
//         console.error('Error in getPaginatedProducts middleware:', error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });