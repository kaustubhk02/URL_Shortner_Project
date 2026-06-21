const express = require('express');
const router = express.Router();

const {handleUserCreation, handleUserLogin} = require('../controllers/userController');

router.post('/signup', handleUserCreation);
router.post('/login', handleUserLogin);

module.exports = router;