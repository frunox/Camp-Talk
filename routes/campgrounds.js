// All the /campground routes
// use express router
var express = require("express");
var router = express.Router();
// define these for later in this file
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// below, don't need to name index.js.  It is assumed when no file is specified
var middleware = require("../middleware");

// INDEX route - show all
router.get("/", (req, res) => {
	// get all campgrounds from db
	Campground.find({}, function(err, allcampgrounds){
		if(err){
			console.log(err);
		} else {
			// currentUser: req.user to get info on logged in user
			res.render("campgrounds/index", {campgrounds: allcampgrounds, page: "campgrounds"});	
		}
	});
});

// CREATE route - add new entry
router.post("/", middleware.isLoggedIn, (req, res) => {
	// get data from form and add to campground array
	var name = req.body.name;
	// add price variable
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username:  req.user.username
	}
	 var newCampground = {name: name, price: price, image: image, description: desc, author:author};
	
	//campgrounds.push(newCampground);
	// replace above and create a new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			// redirect back to the campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW route - showo form for creating new entry
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// SHOW route - must come after /new (:id means anything)
router.get("/:id", function(req, res) {
	// find campground with id provided
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		// add handling of bad id errors with || !foundCampground
		if(err || !foundCampground){
			// console.log(err);
			// provide error handling via flash
			req.flash("error", "Campground not found");
			res.redirect("back");
		} else {
			//console.log(foundCampground);
			// render show template with ID'd campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT Campground route
// show form in edit.ejs and populate it with the current info
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground});
	});	
});

// UPDATE Campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	// redirect (to show page)
});

// DESTROY campground route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// middleware moved to /middleware/index.js


module.exports = router;