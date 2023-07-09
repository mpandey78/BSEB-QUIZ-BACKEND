const mongoose=require('mongoose')

// Create a model for questions
const questionSchema = new mongoose.Schema({
    question: {type:String,require:true},
    options: [{ text: String, isTrue: Boolean }]
  },{
    timestamps:true,
  });
  


module.exports = mongoose.model('Question',questionSchema);