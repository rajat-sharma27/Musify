const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const pwdComplexity = require("joi-password-complexity");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    gender: {type:String, required:true},
    month: {type:String, required:false},
    date: {type:String, required:false},
    year: {type:String, required:false},
    likedSongs: {type:[String], default:[]},
    playlists: {type:[String], default:[]},
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
        {_id: this._id, name:this.name, email:this.email},
        process.env.JWTSECRET,
        { expiresIn: "7d" }
    );
    return token;
};


const validate = (user) => {
	const schema = Joi.object({
		name: Joi.string().min(5).max(10).required(),
		email: Joi.string().email().required(),
		password: pwdComplexity().required(),
		month: Joi.string(),
		date: Joi.string(),
		year: Joi.string(),
		gender: Joi.string().valid("Male", "Female", "Others").required(),
	});
	return schema.validate(user);
};

const User = mongoose.model("user",userSchema);

module.exports = {User, validate};