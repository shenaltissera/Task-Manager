module.exports = currdate
function currdate(){
     const date = new Date()
     const options = {
       weekday:'long',
       month:'long',
       day:'numeric' 
     }
     let headingdate = date.toLocaleDateString('en-us',options)
     return headingdate
    }