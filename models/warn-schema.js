const mongoose = require('mongoose')
const reqString = {
    type: 'string',
    required:true
}
const schema = new mongoose.Schema({
    userId :reqString,
    staffId:reqString,
    guildId:reqString,
    reason:reqString,
    
   },
   {
       timestamps:true
   });
   module.exports = mongoose.model('warnings', schema,'warnings');