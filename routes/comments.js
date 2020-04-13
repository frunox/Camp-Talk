// ==============================
// COMMENTS routes
// ==============================

// index includes root route and Auth routes
// use express router ({mergeParams...} is there to capture the params like :id, which the
// refactoring of the route calls in app.js broke)
var express = require("express");
var router = express.Router({mergeParams: true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");
// below, don't need to name index.js.  It is assumed when no file is specified
var middleware = require("../middleware");

// comments new
router.get("/new", middleware.isLoggedIn, (req, res) => {
	// find campground by id
	Campground.findById(req.params.id, (err, campground) => {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
	// lookup campground by ID
	 Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
		Comment.create(req.body.comment, function(err, comment){
			if(err){
				console.log(err);
				res.redirect("/campgrounds");
			} else {
				// add username and ID to comment
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				// save comment
				comment.save();
				// create new comment
				// connect (associate) comment to campground
				campground.comments.push(comment);
				campground.save();
				// console.log(comment);
				// redirect to campground show page
				req.flash("success", "Comment added");
				res.redirect("/campgrounds/" + campground._id);
			}
		});
		}
	});
});

// EDIT Comments route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	// add error handling for bad campground id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err || !foundCampground) {
			req.flash("Cannot find that campground");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
      		if(err){
          		res.redirect("back");
      		} else {
        		res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      		}
   		});
	});
});

// UPDATE Comments route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
		if(err){
			req.flash("error", "Comment not found");
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY COMMENTS route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	// findBYIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err)	{
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// middleware moved to /middleware/index.js




module.exports = router;