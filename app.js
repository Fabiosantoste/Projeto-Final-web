const express = require('express');
const app = express();
module.exports = app;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./repository/users.repository');
const Product = require('./repository/product.repository');
const authConfig = require('./config/auth'); // Importe o arquivo auth.js
const router = express()

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

const dbURI = 'mongodb://localhost:27017';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});


mongoose.connect('mongodb://localhost/seu-aplicativo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secretpass',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) return done(null, false, { message: 'Incorrect email.' });

    bcrypt.compare(password, user.password, (err, res) => {
      if (res) return done(null, user);
      else return done(null, false, { message: 'Incorrect password.' });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

someEvent(() => {

  app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000');
  });
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/products', authConfig.ensureAuthenticated, require('./routes/products')); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
