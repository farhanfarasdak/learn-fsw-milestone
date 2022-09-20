const express = require('express')
const passport = require('passport')
const router = express.Router()
const pageController = require('../controllers/page')
const customMiddleware = require('../utils/customMiddleware')

router.get('/admin-dashboard',passport.authenticate('jwt', { session: false }), customMiddleware.validateSuperadmin, pageController.adminDashboard)
router.get('/main-dashboard',passport.authenticate('jwt', { session: false }), pageController.mainDashboard)



module.exports = router



