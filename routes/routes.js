const express = require('express');
const {
  login,
  signup,
  googleRedirect,
  getUserData,
  authenticateUser,
  logout,
} = require('../controller/controller');
const passport = require('passport');

const Router = express.Router();

Router.post('/login', login)
  .post('/signup', signup)
  .get('/userdata', authenticateUser, getUserData)
  .get('/logout', logout);

//auth routes
Router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

Router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000?fail',
    session: false,
  }),
  googleRedirect,
);

module.exports = Router;
