import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    description:{
        type:String
    },
    category:{
        required:true,
        type:String,
    },
    image:{
        required:true,
        type:String
    },
    rating:{
        rate:{type:Number, default:0, min:0, max:5},
        count:{type:Number,min:0}
    }
})

export default mongoose.model('Product',productSchema);