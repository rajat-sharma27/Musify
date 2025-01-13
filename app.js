require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const session = require('express-session');
const mongoDbSession = require('connect-mongodb-session')(session);


//middlewares
app.use(express.static('static'));   
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


//set view engine
app.set('view engine', 'ejs');

//connecting to mongodb
const dburl = process.env.MongoURI;
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected successfully...'))
    .catch((err) => console.log('DB could not connect!\nError: ',err));

    const store = new mongoDbSession({
        uri: dburl,
        collection: "sessions"
      })

      app.use(session({
        secret: process.env.JWTSECRET,
        resave: false,
        saveUninitialized: false,
        store: store
      }))

//Authentication
const isAuth = function(req, res, next) {
    if (req.session.isAuth) {
      next()
    } else {
      req.session.error = '';
      res.render('login', {
        isAuth: req.session.isAuth,
        message: "You are not logged in!",
        title: "Log In | "
      })
    }
  }

app.get('/', isAuth,(req, res) => {
    res.render('home.ejs',{
        title: ''
    })
});

app.use("/api/users/", userRoutes);

const PORT = process.env.PORT || 8000   ;
app.listen(PORT,console.log(`Server running on http://localhost:${PORT}/`));