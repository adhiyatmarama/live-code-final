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
        let {cases, CountryId} = req.body;
        let country = null
        Country.findOne({where: {id: CountryId}})
        .then(result => {
            if(result){
                country = result;
                return Country.update({
                    name: country.name,
                    deaths: country.deaths,
                    recovered: country.recovered,
                    cases: cases
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
}

module.exports = ReportController