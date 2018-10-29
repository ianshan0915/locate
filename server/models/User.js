const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        role: String,
        updates: Number,
    }
)

// UserSchema.methods.addFollower = function (fs) {
//     this.followers.push(fs)        
// }
module.exports = mongoose.model('User', UserSchema, 'user')