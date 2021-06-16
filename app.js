const express = require('express')
const mongoose = require('mongoose')
const app = express()
const List = require(__dirname+"/models/list.js").List
const CustomL = require(__dirname+"/models/customlist.js")
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


const item1 = new List(
  {
    content:'Welcome to your todoList'
  }
)
const item2 = new List(
  {
    content:'to add a new item in todolist click the + icon down below'
  }
)
const item3 = new List(
  {
    content:'<---- click here to delete an item in the todolist'
  }
)

const itemarr = [item1,item2,item3]

app.get('/',async (req,res)=>{
    const tasks = await List.find({},{content:1})
    if(tasks.length === 0){
      await List.insertMany(itemarr)
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
    let task = new List({
      content:checktask
    }); 
    await task.save()
  }
  res.redirect('/')
})
 

app.post('/delete',async (req,res)=>{
  let itemcontent = req.body.checkbox 
  await List.deleteOne({content:itemcontent})
  res.redirect('/') 
})
 

app.get('/:customlistname',async (req,res)=>{
  const custlistname = req.params.customlistname
  if(custlistname === 'compose'){
    return
  }
  const findlistname = await CustomL.findOne({name:custlistname})
  if(!findlistname){
  const custList = new CustomL({
    name:custlistname,
    content:itemarr
  })
  await custList.save()
  console.log('document saved')
  res.redirect('/'+custlistname)
  } else {
    res.render('list',{listtype:custlistname,todolist:findlistname.content})
  }
})

   