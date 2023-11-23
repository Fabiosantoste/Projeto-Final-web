const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = require('./models/User');

const newUser = new User({
  email: 'teste@gmail.com',
  password: 'teste123',
});

newUser.save((err, user) => {
  if (err) throw err;
  console.log('Novo usuário criado:', user);
});


const User = mongoose.model('User', userSchema);

module.exports = User;
