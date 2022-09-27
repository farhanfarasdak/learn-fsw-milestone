const express = require('express')
const passport = require('passport')
const jsonParser = require('body-parser').json()
const router = express.Router()
const apiController = require('../controllers/api')
const customMiddleware = require('../utils/customMiddleware')

router.post('/register', jsonParser, apiController.register)
router.post('/login', jsonParser, apiController.login)
router.get('/protected', passport.authenticate('jwt', { session: false }), apiController.protected)


// kpu api
router.post('/candidate', 
  jsonParser, 
  passport.authenticate('jwt', { session: false }),
  customMiddleware.validateAdmin, 
  apiController.createCandidate)

router.get('/candidate', 
  passport.authenticate('jwt', { session: false }), 
  apiController.getCandidates)

router.put('/vote', 
  jsonParser, 
  passport.authenticate('jwt', { session: false }), 
  customMiddleware.validateNormal, 
  apiController.vote)

module.exports = router



