function CreateProduct(productName, productDescription, productPrice) {
    return {
        name: productName,
        description: productDescription,
        price: productPrice
    };
}
module.exports = {
    CreateProduct
}