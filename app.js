const express = require('express')
const app = express()
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
let tasks = []
let worktasks = []
app.get('/',(req,res)=>{
    
     const date = new Date()
    const options = {
      weekday:'long',
      month:'long',
      day:'numeric' 
    }
    let headingdate = date.toLocaleDateString('en-us',options)
    res.render('list',{listtype:headingdate,todolist:tasks})
})
app.get('/work',(req,res) => {
    res.render('list',{listtype:'work',todolist:worktasks})
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
app.listen(3000,()=>{
  console.log('server is running at port 3000')
})