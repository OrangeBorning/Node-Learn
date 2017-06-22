var mongoose = require("mongoose");

var UserSchema = require("../schema/userschema");

var Usermodel = mongoose.model("user",UserSchema)

module.exports = Usermodel;