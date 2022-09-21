const express = require('express')
const passport = require('passport')
const jsonParser = require('body-parser').json()
const router = express.Router()
const apiController = require('../controllers/api')
const customMiddleware = require('../utils/customMiddleware')

router.post('/register', jsonParser, apiController.register)
router.post('/login', jsonParser, apiController.login)
router.get('/protected', passport.authenticate('jwt', { session: false }), apiController.protected)


router.post('/server', 
  jsonParser,
  passport.authenticate('jwt', { session: false }),
  customMiddleware.validateGameMaster,
  apiController.createServer)

router.get('/server', 
  passport.authenticate('jwt', { session: false }), 
  apiController.getServer)


router.put('/choose-server', 
  jsonParser,
  passport.authenticate('jwt', { session: false }),
  customMiddleware.validatePlayer,
  apiController.chooseServer)


module.exports = router



