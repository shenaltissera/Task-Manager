const mongoose = require('mongoose')
const schema = mongoose.Schema

const taskschema = schema({
  content:{
   type:String,
   reqired: true
  }
})

const Task = mongoose.model('task',taskschema)

module.exports = Task
