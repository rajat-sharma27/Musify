const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

router.get('/',(req, res) => {
  res.render('login', {
    isAuth: req.session.isAuth,
    message: "",
    title: "Log In | "
  })
})

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).render("login", {
      isAuth: req.session.isAuth,
      message: 'Invalid email or password!',
      title: 'Log In |'
    });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).render("login", {
      isAuth: req.session.isAuth,
      message: 'Invalid email or password!',
      title: 'Log In |'
    });

  const token = user.generateAuthToken();
  req.session.isAuth = true;
  req.session.user_id=user._id;
  // console.log(user._id);
  
  res.redirect('/')
});

module.exports = router;
