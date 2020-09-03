const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/users.controller');

/* GET home page. */
router.route("/")
  .get((req, res) => {
    res.render('index');
  })
  .post(registerUser);

module.exports = router;
