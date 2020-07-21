const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/users', UserController.getAllUsers);
router.post('/signup', UserController.signup);
router.get('/user/:idUser', UserController.getUser);
router.get('/user/verifieToken/:token', UserController.verifieToken);
router.post('/login', UserController.login);

module.exports = router;
