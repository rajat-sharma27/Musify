const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");


router.get('/',(req, res) => {
	res.render('signup', {
	  isAuth: req.session.isAuth,
	  message: "",
	  title: "Sign Up | "
	})
  })

// create user
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (user)
		return res.status(403).send({ message: "User with given email already Exist!" });

	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	let newUser = await new User({
		...req.body,
		password: hashPassword,
	}).save();

	newUser.password = undefined;
	newUser.__v = undefined;
	res.render('home',
    {
        title: "login |"
    })
});



module.exports = router;
