const {Note, User } = require('../models');

const noteController = {
    //get All
    getNote(req,res) {
        Note.find()
        .select('-__v')
        .then((dbNoteData) => {
            res.json(dbNoteData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //get SINGLE
    getNoteByID(req,res) {
        Note.findOne({ _id: req.params.noteId })
        .then((dbNoteData) => {
            if (!dbNoteData) {
                return res.status(404).json({ message: "no Note with that ID" });
            }
            res.json(dbNoteData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //Create Note
    createNote(req,res) {
        Note.create(req.body)
        .then((dbNoteData) => {
            return User.findOneAndUpdate(
                { username: req.body.userId },
                { $push: { notes: dbNoteData._id }},
                { new: true }
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message: 'Note Created but No User with ID'});
            }

            res.json({message: 'Note Created!'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    //Update Note
    updateNote(req,res) {
        Note.findOneAndUpdate({ _id: req.params.noteId }, { $set: req.body }, {runValidators: true, new: true})
        .then((dbNoteData) => {
            if(!dbNoteData) {
                return res.status(404).json({ message: 'No Note with ID'});
            }
            res.json(dbNoteData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //DELETE Note
    deleteNote(req,res) {
        Note.findOneAndRemove({_id: req.params.noteId})
        .then((dbNoteData) => {
            if (!dbNoteData) {
                return res.status(404).json({ message: 'No Note with ID'});
            }

            //Remove Note ID from Users's Notes Field
            return User.findOneAndUpdate(
                {notes: req.params.noteId },
                { $pull: {notes: req.params.noteId }},
                { new: true }
            );
        })
        .then ((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'Note created but no user with id'});
            }
            res.json({message: 'Note Deleted Successfully'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });    
        
    },

    //Add Reaction to Note
  // add a reaction to a Note
  addReaction(req, res) {
    Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbNoteData) => {
        if (!dbNoteData) {
          return res.status(404).json({ message: 'No Note with this id!' });
        }
        res.json(dbNoteData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove reaction from a Note
  removeReaction(req, res) {
    Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbNoteData) => {
        if (!dbNoteData) {
          return res.status(404).json({ message: 'No Note with this id!' });
        }
        res.json(dbNoteData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
}

module.exports = noteController




