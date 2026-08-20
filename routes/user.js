const express = require('express');
const {handleUserRequest, handleLogin} = require('../controllers/user');
const router = express.Router();

router.post('/', handleUserRequest);

router.post('/login', handleLogin);

module.exports = {router};