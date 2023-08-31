const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authenticationController');

const router = express.Router();

router.get('/', viewController.getOverview);
router.get('/tour/:slug', authController.protect, viewController.getTour);
router.get('/login', viewController.loginUser);

module.exports = router;
