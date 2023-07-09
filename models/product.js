const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{type:String, require:true, unique:true},
    description:{type:String, require:true },
    image:{type:Array},
    categories:{type:Array},
    size: { type: Array },
    color: { type: Array },
    isNew: {
        type: Boolean,
        default: false,
      },
    oldPrice:{type:Number,require:true},
    price:{type:Number,require:true},
},{
    timestamps:true,
})

module.exports = mongoose.model('Product',productSchema);