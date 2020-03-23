const router = require('express').Router()
const userController = require('../Controllers/UserControllers')

router.post('/', userController.login)

module.exports = router;