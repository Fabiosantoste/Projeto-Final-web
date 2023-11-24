const {db} = require('../database/database');

async function SaveProduct(userData) {
	const {collections} = await GetDatabase();

	return collections.products.insertOne(
		JSON.parse(JSON.stringify(userData))
	);
}

async function GetProduct(product_name) {
    const {collections} = await GetDatabase();

    return collections.products.countDocuments({
        'name': product_name
    
    }, {'id_1': 1});
}


module.exports = {
    SaveProduct,
    GetProduct
};