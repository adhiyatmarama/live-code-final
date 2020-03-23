const {Country} = require('../models')

class CountryController {
    static getCountries (req, res, next) {
        Country.findAll()
        .then(result => {
            let countries = []
            result.forEach(country => {
                countries.push({
                    name: country.name,
                    cases: country.cases,
                    deaths: country.deaths,
                    recovered: country.recovered,
                })
            })
            res.status(200).json(countries)
        })
        .catch(err => {
            console.log(err, '<< ini dari get countries')
            next({status: 500, message: 'Server Error'})
        })
    }
}

module.exports = CountryController