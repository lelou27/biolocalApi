const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const AchatController = require('../controllers/AchatController');
const AssociationController = require('../controllers/AssociationController');
const CommercantController = require('../controllers/CommercantController');
const DonController = require('../controllers/DonController');

/**
 * User routes
 */
router.get('/users', UserController.getAllUsers);
router.post('/signup', UserController.signup);
router.get('/user/:idUser', UserController.getUser);
router.get('/user/verifieToken/:token', UserController.verifieToken);
router.post('/login', UserController.login);
router.get('/getUserBarcode', UserController.getUserBarCode);
router.get('/getActuelsXp/:idUser', UserController.getXpActuels);

/**
 * Achat routes
 */
router.get('/achat', AchatController.postAchat);

/**
 * Associations
 */
router.get('/associations', AssociationController.getAllAssociations);

/**
 * Commercants
 */
router.get('/commercants', CommercantController.getCommercants);

/**
 * Commercants
 */
router.post('/don/', DonController.postDon);

module.exports = router;
