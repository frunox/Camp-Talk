const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

// create array of objects with starter data for DB
const data = [
	{
		name:  "Cloud's Rest",
		image: "https://cdn.pixabay.com/photo/2019/01/26/14/43/bannack-camping-tipi-3956397_960_720.jpg",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet."
	},
	{
		name:  "Green Woods",
		image: "https://cdn.pixabay.com/photo/2017/10/07/01/01/bach-leek-2825197_960_720.jpg",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
	},
	{
		name:  "Trout Creek",
		image: "https://cdn.pixabay.com/photo/2017/07/17/16/21/nature-2512944_960_720.jpg",
		description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
	}
];

// delete all campgrounds. Put it in a function called from app.js
function seedDB() {
	// delete campgrounds
	Campground.deleteMany({}, (err) => {
		if(err) {
			console.log(err);
		}
		console.log("Removed campgrounds");
		// add some campgrounds
		data.forEach(function(seed){
			Campground.create(seed, (err, campground) => {
				if(err){
					console.log(err);
				} else {
					console.log("Added a campground");
					// create a comment
					Comment.create(
						{
							text: "Great sites, no internet",
							author:  "Homer"
						}, (err, comment) => {
							if(err){
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
							}
						});
				}
			});	
		});
	});
}

module.exports = seedDB;
