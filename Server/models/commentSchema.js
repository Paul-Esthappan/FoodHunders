
const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        lowercase: true,
      
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
       
    },
    videoId: {
        type: String,
        required: [true, "can't be blank"],
        
    },
    description: {
        type: String,
        required: [true, "can't be blank"],
        
    },

   
}, { timestamps: true });

const comment = mongoose.model('COMMENT', commentSchema)
module.exports = comment