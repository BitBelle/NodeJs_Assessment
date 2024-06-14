import {Request, Response, RequestHandler} from 'express'
import {v4 as uid} from 'uuid' 
import { sqlConfig } from '../config'
import { ProductRequest, Products } from '../Models/productModel'
import mssql from 'mssql'
// import { error } from 'console'
import { paginateProducts } from '../service/productService';

export const addProduct = async(req:ProductRequest, res:Response)=>{
    try{
        const id = uid()
        
            console.log(req.body);
            
        const {product_Name,product_Description,product_Price} = req.body

        if (!product_Name || !product_Description || !product_Price) {
            return res.status(400).json({message: "All fields are required"});
        }

        // conection to db
        const pool = await mssql.connect(sqlConfig)

        // request to db
        await pool.request()
        //what the procedure expects
        .input("product_Id", id)
        .input("product_Name", product_Name)
        .input("product_Description", product_Description)
        .input("product_Price", product_Price)
        .execute('addProduct')

        return res.status(201).json({mesage: "Product Created"})


    }catch (error){

        res.status(500).json(error)

    }
    
}

export const getProducts:RequestHandler = async(req,res) =>{
    try{
        const pool = await mssql.connect(sqlConfig)

        // request to db
        const products = (await pool.request().execute('getProducts')).recordset as Products[]

        res.status(200).json(products)

    }catch (error){
        res.status(500).json(error)
    }
}

export const getProduct = async(req:Request<{id:string}>,res:Response) =>{
    try{
        const pool = await mssql.connect(sqlConfig)

        // request to db
        const product = (await pool.request()
            .input("product_Id", req.params.id)
            .execute("getProduct")).recordset[0] as Products

        res.status(200).json(product)

    }catch (error){
        res.status(500).json(error)
    }
}


export const searchProducts = async (req: Request<{ query: string }>, res: Response) => {
    try {
        const { q } = req.query; 
        const pool = await mssql.connect(sqlConfig);

        const result = await pool.request()
            .input("searchQuery", `%${q}%`)
            .execute("searchProducts");

        const products = result.recordset as Products[];

        res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'Error searching products'});
    }
};

export const paginateProductsHandler = async (req: Request, res: Response) => {
    try {
        const { page = 1, size = 5 } = req.query;
        const offset = (parseInt(page as string) - 1) * parseInt(size as string);
        const limit = parseInt(size as string);

        const products = await paginateProducts(offset, limit);

        res.status(200).json(products);
    } catch (error) {
        
        res.status(500).json({ message: 'Failed to paginate products'});
    }
};



