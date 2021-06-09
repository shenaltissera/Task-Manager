module.exports.currdate = currdate
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
module.exports.currday = currday
function currday(){
  const date = new Date()
  const options = {
    weekday:'long',
  }
  let headingday = date.toLocaleDateString('en-us',options)
  return headingday
}