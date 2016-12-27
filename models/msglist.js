var mongoose = require('mongoose');

var MsglistSchema = mongoose.Schema({
	
    username: String,
    userid: String,
    posroom: String,
    room: String,
    usertype:String,
    message:String,
    date_msg: {type:Date}
});

module.exports = mongoose.model('Msglist', MsglistSchema);