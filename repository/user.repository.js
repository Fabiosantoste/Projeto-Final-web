const database = require('../database/database');

async function storeUserData(userData) {
	const {collections} = await GetDatabase();

	return collections.users.insertOne(
		JSON.parse(JSON.stringify(userData))
	);
}

async function findUser(email, password) {
	let db = await database.GetDatabase();
	let collection = db.collections.users;
	let result = await collection.find({"email": email, "password": password})
	  .limit(1)
	  .toArray();
	return result;
}

module.exports = {
    storeUserData,
    findUser
}