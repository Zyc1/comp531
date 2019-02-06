// this is model.js 
var mongoose = require('mongoose')
require('./db.js')

var commentSchema = new mongoose.Schema({
	commentId: Number,
	name: String,
	text: String,
    img: String
})
var articleSchema = new mongoose.Schema({
	id: Number,
	author: String,
    text: String,
    img: String,
	avatar: String,
    date: Date,
    comments: [ commentSchema ]
})

var userSchema = new mongoose.Schema({
	username: String,
	salt: String,
	hash: String,
	auth: Object
})

var profileSchema = new mongoose.Schema({
	username: String,
	headline: String,
	following: [ String ],
	tel: String,
	email: String,
	dob: String,
	zipcode: String,
	avatar: String
})

exports.Article = mongoose.model('articles', articleSchema)
exports.Comment = mongoose.model('comments', commentSchema)
exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)
