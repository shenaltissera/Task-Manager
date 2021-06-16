const express = require('express')
const mongoose = require('mongoose')
const app = express()
const List = require(__dirname+"/models/list.js").List
const CustomL = require(__dirname+"/models/customlist.js")
const url = 'mongodb+srv://lmd:lmdrdx123@todolist-cluster.nnsvl.mongodb.net/todolistDB?retryWrites=true&w=majority'
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/public')));


mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(result=>{
  console.log('DB connected')
  app.listen(process.env.PORT || 3000,()=>{
  console.log('Server started succesfully')
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
  const listname = req.body.list
  if(checktask === '') {
    console.log('task is null')
    if(listname === 'Today'){
      res.redirect('/')
    } else {
      res.redirect('/'+listname)
    }
  } else {    
    let task = new List({
      content:checktask
    }); 
    if(listname === 'Today'){
     await task.save()
     res.redirect('/')
    } else {
      CustomL.findOne({name:listname},(err,foundlist)=>{
        foundlist.content.push(task)
        foundlist.save()
        res.redirect('/'+listname)
      })
    }
  }
})
 

app.post('/delete',async (req,res)=>{
  let itemcontent = req.body.checkbox 
  let listname = req.body.listname
  if(listname === "Today"){
  await List.deleteOne({content:itemcontent})
  res.redirect('/')
  } else {
    await CustomL.findOneAndUpdate({name:listname},{$pull:{content:{content:itemcontent}}})
    res.redirect('/'+listname)
  }
})
 

app.get('/:customlistname',async (req,res)=>{
  const custlistname = req.params.customlistname
  if(custlistname === 'compose'|| custlistname === 'favicon.ico'){
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
    res.render('list',
    {
     listtype:custlistname,
     todolist:findlistname.content
    })
  }
  res.redirect('/'+custlistname)
})


   