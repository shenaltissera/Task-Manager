const mongoose = require('mongoose')
const schema = mongoose.Schema

const taskschema = schema({
  content:{
   type:String,
   reqired: true
  }
})

const List = mongoose.model('task',taskschema)

module.exports = {List,taskschema}
