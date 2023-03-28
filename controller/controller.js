const User = require('../modal/userModal');
const jwt = require('jsonwebtoken');

module.exports = {
  //@ route /login => to log the user in
  login: async (req, res) => {
    try {
      var expiryDate = new Date(Date.now() + 86400000);
      const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      const user = await User.find({ email: req.body.email });

      if (user.length === 0) throw new Error('no user fround');

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
        expires: expiryDate,
      });

      res.status(200).send({
        message: 'success',
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: 'fail',
        error: err || 'something went wrong',
      });
    }
  },

  //@ route /signup => to signup the user
  signup: async (req, res) => {
    try {
      var expiryDate = new Date(Date.now() + 86400000);
      const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
      const user = await User.create(req.body);

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
        expires: expiryDate,
      });

      res.status(200).send({
        message: 'new user created',
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: 'something went wrong while creating the user',
        error: err,
      });
    }
  },

  //@ route /userdata
  getUserData: async (req, res) => {
    const userEmail = req.payload.email;
    const user = await User.find({ email: userEmail });
    res.status(200).send({
      status: 200,
      message: 'welcome user',
      user: user[0],
    });
  },

  //@ route /logout
  logout: async (req, res) => {
    try {
      res.clearCookie('jwt', { domain: 'localhost', path: '/' });
      res.status(200).send('logout Successful');
    } catch (err) {
      res.status(500).send(err);
    }
  },

  //@ route /auth/google/callback
  googleRedirect: async (req, res, err) => {
    try {
      var expiryDate = new Date(Date.now() + 86400000);
      const token = jwt.sign({ email: req.user.email }, process.env.JWT_SECRET);

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true,
        expires: expiryDate,
      });

      res.redirect('http://localhost:3000/profile');
    } catch (err) {
      console.log(err);
      res.redirect('http://localhost:3000/');
    }
  },

  //middleWare
  authenticateUser: (req, res, next) => {
    try {
      const token = req.headers.cookie.split('=')?.[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.payload = payload;
      next();
    } catch (err) {
      res.status(401).send({
        status: 'fail',
        error: 'unauthenticated',
      });
    }
  },
};
