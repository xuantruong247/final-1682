const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numberViews: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    dislikes: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    image: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg"
    },
    author: {
        type: String,
        default: 'Admin'
    }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

module.exports = mongoose.model('Blog', blogSchema);