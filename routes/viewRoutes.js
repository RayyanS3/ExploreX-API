const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authenticationController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewController.getOverview);
router.get('/tour/:slug', viewController.getTour);
router.get('/login', viewController.loginUser);
router.get('/me', authController.protect, viewController.getAccount);

module.exports = router;
