const router = require('express').Router();
const {
    getNote,
    getNoteByID,
    createNote,
    updateNote,
    deleteNote,
    addReaction,
    removeReaction,
} = require('../../controllers/note-controller')


// /api/notes
router.route('/').get(getNote).post(createNote);

// /api/notes/:noteId
router.route('/:noteId').get(getNoteByID).put(updateNote).delete(deleteNote);

router.route('/:noteId/reactions').post(addReaction);

router.route('/:noteId/reactions/:reactionId').delete(removeReaction);

module.exports = router;