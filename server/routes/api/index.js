const router = require('express').Router();
const userRoutes = require('./user-routes');
const notesRoutes = require('./notes-routes');

router.use('/users', userRoutes);
router.use('/notes', notesRoutes);

module.exports = router;
