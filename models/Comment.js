// Require Mongoose
var mongoose = require("mongoose");
var moment = require("moment");

// Create a Schema Class
var Schema = mongoose.Schema;

// Create Comment Schema
var CommentSchema = new Schema({

    // Author"s Name
    author: {
        type: String,
        required: true
    },
    // Comment Content
    content: {
        type: String,
        required: true
    },

    updated: {
        type: String,
        default: moment().format("MMMM Do YYYY, h:mm A")
    }

//  _articleId: {
//      type: Schema.Types.ObjectId,
//      ref: 'Article'
//  }

});

// Create the Comment model with Mongoose
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Model
module.exports = Comment;






