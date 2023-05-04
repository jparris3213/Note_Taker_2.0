const mongoose = require("mongoose");
const reactionSchema = require('./Reaction');
const dateFormat = require("../utils/dateFormat")

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        default: "Note_Title"
    },
    content: {
        type: String,
        default: "Note_Text"
    },
    username: {
        type: String,
    },
    createdAt: {
        type: Date,
        get: timestamp => dateFormat(timestamp)
    }
});




export default mongoose.models.Note || mongoose.model('Note', noteSchema)