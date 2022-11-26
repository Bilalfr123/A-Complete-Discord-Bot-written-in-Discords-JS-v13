const mongoose = require('mongoose')
const reqString = {
    type: 'string',
    required:true
}
const schema = new mongoose.Schema({
    // _id= guild id
    _id :reqString,
    channelID:reqString,
    text:reqString
   });
module.exports = mongoose.model('welcome', schema,'welcome');