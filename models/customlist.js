const mongoose = require('mongoose')
const listschema = require(__dirname+'/list.js').taskschema
const customlistschema = mongoose.Schema({
  name:String,
  content:[listschema]
}) 
const CustList = mongoose.model('list',customlistschema)

module.exports = CustList