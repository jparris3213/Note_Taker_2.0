const router = require(`express`).Router();
const apiRoutes = require('./api/');

router.use(`/api`, apiRoutes);

router.use((req,res) => {
    return res.send(`Wrong Route`);
});

module.exports = router;

//The following bit of code
//Saved for Jacob Parris's own posterity
//was found to be the cause of about 2+ hours of
//relentless
//line by line
//code checking
//and was only discovered, after copy and pasting the working example
//to this index.js file
//module.exportes = router;
//apparently my code wants to have an accent
