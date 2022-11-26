const mongoose = require('mongoose')
const reqString = {
    type: 'string',
    required:true
}
const pschema = new mongoose.Schema({
    // _id= guild id
    userId :reqString,
    staffId:reqString,
    guildId:reqString,
    reason:reqString,
    expires:Date,
    type:{
type:'string',
required:true,
enum:['ban', 'mute']
    }
   },
   {
       timestamps:true
   });
module.exports = mongoose.model('punishment', pschema,'punishment');
