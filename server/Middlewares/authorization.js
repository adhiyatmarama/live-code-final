const {Report} = require('../models')

function authorization (req, res, next) {
    let id = Number(req.params.id)
    let UserId = Number(req.userData.id)
    Report.findOne({where: {id}})
    .then(result => {
        if(result){
            if(result.UserId === UserId){
                next()
            }else{
                throw({status: 403, message:'Not authorized'})
            }
        }else{
            throw({status: 404, message: 'Report not found'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization