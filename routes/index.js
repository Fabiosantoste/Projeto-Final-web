const express = require('express');
const user = require('../repository/user.repository');
const router = express.Router();

router.get('/', (req, res) => {
  let usuario = user.findUser("admin@test.com", "123456");
  console.log(usuario.then(value => {console.log(value)}));

  res.render('login');
});

module.exports = router;
