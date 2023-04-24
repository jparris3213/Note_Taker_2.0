const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dateFormat = require("../utils/dateFormat")

const noteSchema = new Schema({

    title: {
        type: String,
        default: "Note_Title"
    },
    content: {
        type: String,
        default: "Note_Text"
    },
    createdAt: {
        type: Date,
        get: timestamp => dateFormat(timestamp)
    }
});


const Note = mongoose.model("Note", noteSchema)
module.exports = Note;