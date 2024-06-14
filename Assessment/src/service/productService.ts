import { searchProducts } from "../Controllers/productController";


export const paginateProducts = async (offset: number, limit: number) => {
    const query = `CALL PaginateProducts(${offset}, ${limit})`;
    const results = await executeQuery(searchProducts);
    return results;
};
function executeQuery(searchProducts: any) {
    throw new Error("Function not implemented.");
}

