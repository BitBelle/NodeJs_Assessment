CREATE DATABASE Assessment;

USE Assessment;

CREATE TABLE Products(
    product_Id VARCHAR(255) PRIMARY KEY,
    product_Name VARCHAR(255),
    product_Description VARCHAR(255),
    product_Price INT,
);


SELECT * FROM Products;
