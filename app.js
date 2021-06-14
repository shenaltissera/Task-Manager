const express = require('express')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const app = express()
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
    const tasks = await Task.find({},{content:1})
    if(tasks.length === 0){
      const item1 = new Task(
        {
          content:'Welcome to your todoList'
        }
      )
      const item2 = new Task(
        {
          content:'to add a new item in todolist click the + icon down below'
        }
      )
      const item3 = new Task(
        {
          content:'<---- click here to delete an item in the todolist'
        }
      )
      await Task.insertMany([item1,item2,item3])
      res.redirect('/')
    }else{
    res.render('list',{listtype:'Today',todolist:tasks})  
    }
})


app.post('/',async (req,res)=>{
  const checktask = req.body.task
  if(checktask === '') {
    console.log('task is null')
  } else {
    let task = new Task({
      content:checktask
    }); 
    await task.save()
  }
  res.redirect('/')
})
 

app.post('/delete',async (req,res)=>{
  let itemcontent = req.body.checkbox 
  await Task.deleteOne({content:itemcontent})
  res.redirect('/') 
})
 

app.get("/about",(req,res)=>{
  res.render("about")
})   