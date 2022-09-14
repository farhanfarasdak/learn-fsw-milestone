const express = require('express')
const pageController = require('../controllers/page')
const router = express.Router()

router.get('/login', pageController.login)
router.post('/login', pageController.submitLogin)
router.get('/protected', pageController.protected)
router.get('/register', pageController.register)
router.post('/register', pageController.submitRegister)
router.get('/logout', pageController.logout)

module.exports = router