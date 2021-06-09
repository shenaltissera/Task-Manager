const express = require('express')
const app = express()
const date = require(__dirname+"/date.js")
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
let tasks = []
let worktasks = []
app.get('/',(req,res)=>{
    let day = date()
    res.render('list',{listtype:day,todolist:tasks})
})
app.post('/',(req,res)=>{
  let task = req.body.task; 
  if(req.body.list === "work") {
    worktasks.push(task)
    res.redirect("/work")
  }
  else{
    tasks.push(task)   
    res.redirect('/')
  }
})
app.get('/work',(req,res) => {
    res.render('list',{listtype:'work',todolist:worktasks})
})
app.get("/about",(req,res)=>{
  res.render("about")
})
app.listen(3000,()=>{
  console.log('server is running at port 3000')
})