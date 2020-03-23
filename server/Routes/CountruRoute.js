const router = require('express').Router()
const CountryController = require('../Controllers/CountriesController')

router.get('/', CountryController.getCountries)

module.exports = router