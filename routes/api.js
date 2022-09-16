const express = require('express')
const passport = require('passport')
const jsonParser = require('body-parser').json()
const router = express.Router()
const apiController = require('../controllers/api')

router.post('/register', jsonParser, apiController.register)
router.post('/login', jsonParser, apiController.login)
router.get('/protected', passport.authenticate('jwt', { session: false }), apiController.protected)

module.exports = router



