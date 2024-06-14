CREATE PROCEDURE searchProducts
    @searchQuery VARCHAR(100)
AS
BEGIN
    SELECT *
    FROM Products
    WHERE product_Name LIKE '%' + @searchQuery + '%';
END
