// add these lines so Campground and Comment are defined in the functions
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all middleware code in this file
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, foundCampground) => {
			// add handling of null campground error || !foundCampground
			if(err || !foundCampground){
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				// does user own campground?
				if(foundCampground.author.id.equals(req.user.id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});	
	} else {
		// redirect back to previous page. V11 - add flash message
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			// add flash message on err
			if(err || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				// does user own comment?
				if(foundComment.author.id.equals(req.user.id)) {
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});	
	} else {
		// add flash message
		req.flash("error", "Please Log In First");
		// redirect back to previous page
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
	   	return next();
	}
	// add flash message
	req.flash("error", "Please Log In");
	res.redirect("/login");
}






module.exports = middlewareObj;