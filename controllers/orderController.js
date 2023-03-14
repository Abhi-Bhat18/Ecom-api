import Order from '../models/orderSchema.js'

export const getOrders = async(req,res)=>{
    try {
        const orders = await Order.find({}).select("firstname lastname email products")

        if(orders) return res.json(orders)
        else throw new Error('Bad Request')
    } catch (error) {
        console.log(error)
        return res.json({error:error,'status':'error'})
    }
}

export const createOrder = async(req,res)=>{
    try {
       const order = await Order.create(req.body)
       if(order) 
       return res.json({'status':'success'})
        else throw new Error('Order did not complete')
    } catch (error) {
        console.log(error)
        return res.json({error:error.message,'status':'error'})
    }
}