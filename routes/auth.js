const express = require('express');
const router = express.Router();
const passport = require('passport');

// GitHub OAuth login
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;