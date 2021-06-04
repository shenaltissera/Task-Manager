const express = require('express')
const app = express()
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    
     const date = new Date()
    const options = {
      weekday:'long',
      month:'long',
      day:'numeric' 
    }
    let headingdate = date.toLocaleDateString('en-us',options)
    res.render('list',{headingdate:headingdate})
})
app.listen(3000,()=>{
  console.log('server is running at port 3000')
})