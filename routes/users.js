const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const StoreUserData = require('../repository/user.repository');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { email, password, password2 } = req.body;
  const errors = [];

  if (!email || !password || !password2) {
    errors.push({ msg: 'Preencha todos os campos' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Senhas não coincidem' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'A senha deve ter pelo menos 6 caracteres' });
  }

  if (errors.length > 0) {
    res.render('register', { errors });
  } else {
    const user = await User.findOne({ email: email });

    if (user) {
      errors.push({ msg: 'Email já registrado' });
      res.render('register', { errors });
    } else {
      const newUser = new User({ email, password });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          await newUser.save();
          res.redirect('/users/login');
        });
      });
    }
  }
});

module.exports = router;
