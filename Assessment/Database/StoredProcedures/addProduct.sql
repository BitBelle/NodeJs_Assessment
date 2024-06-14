USE Assessment

GO

CREATE OR ALTER PROCEDURE addProduct (
    @product_Id VARCHAR(255), 
    @product_Name VARCHAR(255), 
    @product_Description VARCHAR(255),
    @product_Price INT
    )

AS
BEGIN

INSERT INTO Products(product_Id, product_Name,
 product_Description, product_Price)
VALUES (@product_Id, @product_Name, 
@product_Description,@product_Price)
END