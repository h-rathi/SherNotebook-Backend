const mongoose=require('mongoose');

const run= async ()=>{
     await mongoose.connect('mongodb://127.0.0.1:27017/')
     console.log("connected")
}
module.exports=run;
