const mongoose = require('mongoose');
const { Schema } = mongoose;

const Notes = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  
  title: {type:String,
    require:true
  }, 
  // date: { default: Date.now },
  
  content:String,
  tag:String

  
});
module.exports=mongoose.model('notes',Notes);