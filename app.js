// Version 12 Deployed
const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Campground = require("./models/campground"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	seedDB = require("./seeds");

// define values to require the routes files
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");

const PORT = process.env.PORT || 3000;

// Connect to the Mongo DB (camp_talk)
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/camp_talk",
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
// mongoose.connect("mongodb://localhost/camp_talk", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// mongoose.connect('mongodb+srv://jcannon:22spinect@cluster0-7v1tx.mongodb.net/yelp_camp?retryWrites=true&w=majority', {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false
// });
// use ENV variable DATABASEURL
// mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// Schema setup, mow in /models/campgrounds.js

// seedDB();  // run seeds.js to clear db and add default data

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "This is any text for code decode",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// this id's the current user (middleware) (the flash statements make 'error' and 'success' defined in all routes)
app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// tell express to use the routes. Note syntax to DRY the code
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// app.listen(process.env.PORT, process.env.IP);
// app.listen(3000, (req, res) => {
// 	console.log("Camp-Talk Server Running");
// });
app.listen(PORT, () =>
	console.log(`🌎  ==> Camp Talk now listening on PORT ${PORT}!`)
);