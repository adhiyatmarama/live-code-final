const jwt = require('jsonwebtoken');

function makeToken(user) {
    let token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET);
    return token
}

module.exports = makeToken