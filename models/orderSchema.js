import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    products:[
        {
            id: {type:Number},
            title:{type:String},
            price:{type:Number},
            description:{type:String},
            category:{type:String},
            image:{type:String},
            qty:{type:Number}
        }
    ]
})

export default mongoose.model('Order',orderSchema);