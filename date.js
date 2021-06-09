// module.exports and exports is the same thing
const date = new Date()
let options = {}

exports.currdate = function (){
      options = {
       weekday:'long',
       month:'long',
       day:'numeric' 
     }
      return date.toLocaleDateString('en-us',options)
    }

exports.currday = function (){
  options = {
    weekday:'long',
  }
  return date.toLocaleDateString('en-us',options)
}