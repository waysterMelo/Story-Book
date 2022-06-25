const express = require('express');
const passport = require('passport');
const router = express.Router()

//@desc Auth with Google
//@route Get /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))


//@desc Goole Auth Callback
//@route Get /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'} ), (req, res) => {
    res.redirect('/dashboard')
})

//@Desc Logout user
//@Route /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err){ return next(err); }
        res.redirect('/');
    });
});

module.exports = router;