require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const bodyParser = require("body-parser")
const session = require('express-session');
const { User, validate } = require("./models/user");
const mongoDbSession = require('connect-mongodb-session')(session)


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


app.post('/addliked', async(req,res)=>{
  likedSong=req.body.songC;
  const user = await User.findByIdAndUpdate(req.session.user_id,{$push:{"likedSongs":likedSong}});
})

app.post('/rmvliked', async (req,res)=>{
  removedSong = req.body.songC;
  const user = await User.findByIdAndUpdate(req.session.user_id, {$pull: { "likedSongs": removedSong }});
})

app.get('/', isAuth,(req, res) => {
    res.render('home.ejs',{
        title: ''
    })
});

app.use("/api/users/", userRoutes);
app.use("/api/login/", authRoutes);


app.get('/queue',auth,(req,res)=>{
    res.render('queue',{
        isAuth:false,
        title:"queue |",
        list: []
    })
})


app.get('/player',isAuth,(req,res)=>{
    res.render('player',{
        isAuth:false,
        title:"queue |"
    })
})

app.get('/dashboard',isAuth,(req,res)=>{
    res.render('dashboard',{
        isAuth:true,
        title:"queue |"
    })
})

app.get('/seeall/:id',isAuth,async (req,res)=>{
    const user = await User.findById(req.session.user_id);
    // console.log(user.likedSongs);

    res.render('seeall',{
        isAuth:false,
        title:"All songs |",
        id: req.params.id,
        lkSongs : user.likedSongs
    })
})

app.get('/logout', function(req, res) {
    req.session.destroy((err) => {
      if (err) throw err;
      res.redirect('/')
    })
  })




const PORT = process.env.PORT || 8000   ;
app.listen(PORT,console.log(`Server running on http://localhost:${PORT}/`));