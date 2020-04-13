// index includes root route and Auth routes
// use express router
var express = require("express");
var router = express.Router();
// define for use in this file
var passport = require("passport");
var User = require("../models/user");

//  Root route, replace 'app' with 'router'
router.get("/", (req, res) => {
	res.render("landing");
});

// AUTH ROUTES
// show register form
router.get("/register", (req, res) => {
	res.render("register", {page: "register"});
});

// hondle signup logic
router.post("/register", (req, res) => {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		// use flash to display error. err is an object that includes key message:
		if(err){
			console.log(err);
			return res.render("register", {error: err.message});
		}
		passport.authenticate("local")(req, res, ()=>{
			req.flash("success", "Welcome to Yelpcamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// LOGIN ROUTES - need 2, a GET and a POST
// show login form
router.get("/login", function(req, res){
	res.render("login", {page: "login"});
});

// handling login logic including middleware (passport.authentication())
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){
	
});

// LOGOUT route (V11 add flash message)
router.get("/logout", (req, res) => {
   req.logout();
   req.flash("success", "You are logged out");
   res.redirect("/campgrounds");
});

module.exports = router;
