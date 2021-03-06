const mongoose = require('mongoose')

let UpdateSchema = new mongoose.Schema(
    {
        comment: String,
        action: String,
        upatedAt: {
            type: Date,
            default: Date.now
        },
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        article: {
            type: Number,
            ref: 'Article'
        },
        repo: {
            type: Number,
            ref: 'Repo'
        }
    }
)

module.exports = mongoose.model('Update', UpdateSchema, 'update')