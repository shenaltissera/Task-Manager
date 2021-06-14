const express = require('express')
const mongoose = require('mongoose')
const app = express()
const date = require(__dirname+"/date.js")
const Task = require(__dirname+"/models/task.js")
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
mongoose.connect('mongodb://localhost:27017/todolistDB',{useNewUrlParser:true,useUnifiedTopology:true}).then(result=>{
  console.log('DB connected')
  app.listen(3000,()=>{
  console.log('server is running on port 3000')
  })
}).catch(err=>{
  console.error(err)
})
app.get('/',async (req,res)=>{
    let day = date.currdate()
    const tasks = await Task.find({},{_id:0,content:1})
    res.render('list',{listtype:day,todolist:tasks})
})
app.post('/',async (req,res)=>{
  let task = new Task({
    content:req.body.task
  }); 
  await task.save()
  res.redirect('/')
})
app.get("/about",(req,res)=>{
  res.render("about")
})