const userService = require('./user.service');
const { sign } = require('../../common/helpers/jwt.helper');

module.exports = {
  signUp: (req, res, next) => {
    userService
      .create(req.validated)
      .then(user => {
        res.status(200).json({ user });
      })
      .catch(e => res.status(e.message ? 401 : 500).json({ e: e.message || 'DB error' }));
    console.log('user validated data', req.validated);
    console.log('userController.signUp called');
  },
  signIn: (req, res, next) => {
    // we have access to req.user thanks to passport which reassign the user   to the request
    console.log(req.user);
    const token = sign(req.user.id);
    res.status(200).json({ token  });
    console.log('successful login');
  },
  secret: (req, res, next) => {
    const email = req.user.google.email || req.user.facebook.email || req.user.local.email;
    res.status(200).json({ email });
    console.log(req.user);
    console.log('userController.secret called');
  },
};
