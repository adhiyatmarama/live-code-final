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
}

module.exports = ReportController