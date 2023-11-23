const {GetDatabase} = require('../database/database');

async function StoreUserData(userData) {
	const {collections} = await GetDatabase();

	return collections.users.insertOne(
		JSON.parse(JSON.stringify(userData))
	);
}

async function ExistsUserByEmail(user_email) {
	const {collections} = await GetDatabase();

	return collections.users.countDocuments({
		'user.email': user_email
	}, {'id_1': 1});
}

module.exports = {
    StoreUserData,
    ExistsUserByEmail
}