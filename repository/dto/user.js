function CreateUserData(registration_id, username, userEmail, userPassword, contacts, avatarURL, role, timeStamp, filter = {},) {
	return {
		id: registration_id,
		user: {
			username: username,
			email: userEmail,
			password: userPassword,
			avatarURL: avatarURL,
		},
        payments: [],
		...filter
	};
}