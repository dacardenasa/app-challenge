const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/users.controller');
const { registerUser } = require('../controllers/users.controller');


/* GET home page. */
router.route("/register")
  .get((req, res) => {
    res.render('register');
  })
  .post(registerUser);

router.route("/")
  .get(getUsers)

module.exports = router;