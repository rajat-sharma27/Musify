const router = require("express").Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const isAuth = require("../middleware/auth");

router.get('/',(req, res) => {
  res.render('login', {
    message: "",
    title: "Log In | ",
    takeauth: false
  })
})

router.post("/", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if(email=="" || password==""){
      return res.render("login", {
        takeauth: false,
        message: 'Invalid email or password!',
        title: 'Log In |'
      });
  }


  const user = await User.findOne({ email: email });
  if (!user)
    return res.render("login", {
      takeauth: false,
      message: 'User Not Found',
      title: 'Log In |'
    });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.render("login", {
      takeauth: false,
      message: 'Invalid password!',
      title: 'Log In |'
    });

  const token = await user.generateAuthToken(); 
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/');
});

module.exports = router;
