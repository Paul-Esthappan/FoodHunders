const mongoose = require('mongoose')

var videoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        
    },
    videoUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default:0,
    },
    tags: {
        type: [String],
        default:[]
    },
    likes: {
        type: [String],
        default:[]
    },
    dislikes: {
        type: [String],
        default:[]
    },
    location: {
        type: String,
        required: true,
    },
    recommendation: {
        type: String,
        required: true,
    },
    worth: {
        type: String,
        required: true,
    },
    taste: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    savedNo: { type: Number, default: 0 },
    videofilename: {
        type:String
    },
    thumbnailfilename: {
        type:String
    },

    
    


}, { timestamps: true })
const video = mongoose.model('VIDEO', videoSchema)
module.exports = video
