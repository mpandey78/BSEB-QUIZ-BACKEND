const mongoose = require('mongoose');
const uuid = require('uuid');

const oerderSchema = new mongoose.Schema({
    orderID:{ type:String, default: uuid.v1 },
    userId:{type:String, require:true},
    products:[{
        productId:{type:String},
        quantity:{type:Number, default:1},
        name:{ type: String},
        img: { type: String},
        price: { type: Number},
    }],
    amount:{type:Number, require:true},
    address:{type:Object, require:true},
    status:{type:String, default:'pending'},
},{
    timestamps:true,
})

module.exports = mongoose.model('Order',oerderSchema);