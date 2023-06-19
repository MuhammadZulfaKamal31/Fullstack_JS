const express = require('express');
const { getUsers } = require('../controllers/controller.js');

const router = express.Router();

router.get('/users', getUsers);

module.exports = router;
