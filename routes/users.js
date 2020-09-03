const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/users.controller');

/* GET home page. */
router.route("/")
  .get(getUsers)

module.exports = router;