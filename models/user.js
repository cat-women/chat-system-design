let
    mongooseLocal = require('mongoose'),
    {Schema} = mongooseLocal


module.exports = function(conn) {

    const User = new Schema({
        email: String,
        username: String,
        password: String
    })
    conn.model('user', User)
}
