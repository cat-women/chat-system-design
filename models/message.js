let
    mongooseLocal = require('mongoose'),
    {Schema} = mongooseLocal


module.exports = function(conn) {

    const message = new Schema({
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true
        },
        message: {
            text: {
                type: String,
                default: ''
            },
            image: {
                type: String,
                default: ''
            }
        },
        seen: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true})
    conn.model('message', message)
}
