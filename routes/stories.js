const express = require('express');
const router = express.Router();
const {ensureAuth, ensureGuest} = require('../middlewares/auth')

const Story = require('../models/Story');

//@desc Show add Page
//route GET /stories/add/
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

//@desc Process add form
//route Post /stories/
router.post('/', ensureAuth, async(req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

module.exports = router;