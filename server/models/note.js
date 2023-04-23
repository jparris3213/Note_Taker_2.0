const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
   id: {
        type: Date,
        default: Date.now
    },

    title: {
        type: String,
        default: "Note_Title"
    },
    content: {
        type: String,
        default: "Note_Text"
    },
    created: {
        type: Date,
        default: Date.now
    }
});


const Note = mongoose.model("Note", noteSchema)
module.exports = Note;