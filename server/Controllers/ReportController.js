const {Country, Report} = require('../models')

class ReportController {
    static getReports(req, res, next){
        let UserId = Number(req.userData.id)
        Report.findAll({where: {UserId}})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err, '<< dari get Reports')
            next({status: 500, message: 'Server Error'})
        })
    }
    static addReport (req, res, next){
        let UserId = Number(req.userData.id)
        let cases = Number(req.body.cases);
        let CountryId = Number(req.body.CountryId)
        let country = null
        Country.findOne({where: {id: CountryId}})
        .then(result => {
            if(result){
                country = result;
                let totalCases = cases+Number(country.cases);
                return Country.update({
                    name: country.name,
                    deaths: country.deaths,
                    recovered: country.recovered,
                    cases: totalCases,
                }, {where: {id: CountryId}})
            }else{
                next({status: 404, message: 'Country not found'})
            }
        })
        .then(result => {
            if(result[0]){
                return Report.create({
                    cases, CountryId, UserId
                })
            }else{
                next({status: 401, message: 'Failed Add Report'})
            }
        })
        .then(result => {
            if(result) {
                return Report.findOne({where: {id: result.id}, include: Country})
            }
        })
        .then(report => {
            res.status(201).json({report})
        })
        .catch(err => {
            console.log(err, '<< ini err create report')
            next({status: 500, message: 'Server Error'})
        })
    }
    static deleteReport(req, res, next){
        let id = Number(req.params.id)
        let reportCases = null
        let updatedCountry = null
        let countryId = null
        Report.findOne({where: {id}})
        .then(result => {
            if(result){
                reportCases = Number(result.cases);
                countryId = Number(result.CountryId)
                return Country.findOne({where: {id: result.CountryId}})
            }else{
                next({status: 404, message: 'Report Not Found'})
            }
        })
        .then(country => {
            if(country){
                let newCases = Number(country.cases) - reportCases
                updatedCountry = {
                    name: country.name,
                    deaths: country.deaths,
                    recovered: country.recovered,
                    cases: newCases
                }
                return Country.update(updatedCountry, {where: {id: country.id}})
            }
        })
        .then(result => {
            if(result){
                return Report.destroy({where: {id}})
            }
        })
        .then(result => {
            if(result){
                return Country.findOne({where: {id: countryId}})
            }else{
                next({status: 404, message: 'Failed delete Report'})
            }
        })
        .then(country2 => {
            if(country2) {
                res.status(200).json({country: country2, report: 'Successfully delete'})
            }
        })
        .catch(err => {
            console.log(err, '<< ini dari delete report')
            next({status: 500, message: 'Server Error'})
        })
    }
}

module.exports = ReportController