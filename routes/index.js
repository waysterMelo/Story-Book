const express = require('express');
const router = express.Router();
const {ensureGuest, ensureAuth } = require('../middlewares/auth');

router.get('/', ensureGuest, (req, res) => {
    res.render('login' , {layout: 'login'})
})

router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard', {name: req.user.firtsName, })
})

module.exports = router;