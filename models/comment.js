var mongoose = require("mongoose");

// capture the users id using id: {}
var commentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type:  mongoose.Schema.Types.ObjectID,
			ref: "User"
		},
		username: String
	}
});

// Compile db model is handled by the exports statement
// var Comment = mongoose.model("Comment", commentSchemadSchema);

module.exports = mongoose.model("Comment", commentSchema);