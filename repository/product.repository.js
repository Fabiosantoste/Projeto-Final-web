const {GetDatabase} = require('../database/database');

async function StoreProductData(userData) {
	const {collections} = await GetDatabase();

	return collections.products.insertOne(
		JSON.parse(JSON.stringify(userData))
	);
}

async function ExistsProductByName(product_name) {
    const {collections} = await GetDatabase();

    return collections.products.countDocuments({
        'name': product_name
    
    }, {'id_1': 1});
}


module.exports = {
    StoreProductData,
    ExistsProductByName
};