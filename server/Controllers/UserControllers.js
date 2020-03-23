const {User} = require('../models')
const makeToken = require('../Helpers/makeToken')

class UserController {
    static login (req, res, next){
        let { username, password } = req.body;
        User.findOne({where: {username}})
        .then(user => {
            if (user) {
                if(user.password === password) {
                    let token = makeToken(user)
                    res.status(200).json({token, id: user.id, username:user.username});
                }else{
                    next({status: 404, message: 'Wrong Password'})
                }
            }else{
                next({status: 404, message: 'User not found'})
            }
        })
        .catch(err => {
            console.log(err, '<<< ini dari login')
            next({status: 500, message: 'Server Error'})
        })
    }
}

module.exports = UserController