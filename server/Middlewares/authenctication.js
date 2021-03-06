const jwt = require('jsonwebtoken')

function authentication (req, res, next) {
    let {token} = req.headers;
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded
        next()
      } catch(err) {
        // err
        next({status: 400, message: 'Please Login'})
      }
}   

module.exports = authentication