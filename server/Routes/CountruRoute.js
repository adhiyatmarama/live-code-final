const router = require('express').Router()
const CountryController = require('../Controllers/CountriesController')

const authentication = require('../Middlewares/authenctication')

router.get('/', authentication, CountryController.getCountries)

module.exports = router