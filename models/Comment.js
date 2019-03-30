const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
    },
    parentQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    upvotes: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('Comment', commentSchema);