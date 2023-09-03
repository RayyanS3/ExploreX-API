const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authenticationController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.loginUser);
router.get('/me', authController.protect, viewController.getAccount);

router.route('/submit-user-data', viewController.updateUserdata);
module.exports = router;
