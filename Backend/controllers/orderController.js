import Order from "../models/orederModel.js";
import Product from "../models/productModel.js";


function calcPrices(orderItems){
            const itemsPrice = orderItems.reduce((acc,item)=> acc + item.price * item.qty,0)
        

            const shippingPrice = itemsPrice > 100 ? 0 : 10
            const taxRate = 0.15,
            taxPrice = (itemsPrice * taxRate).toFixed(2)


            const totalPrice = (
               ( itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2)
            )

            return{
                itemsPrice:itemsPrice.toFixed(2),
                shippingPrice:shippingPrice.toFixed(2),
                taxPrice,
                totalPrice
            } 
        
}   
 const createOrder = async(req,res)=>{

    try {

const {orderItems,shippingAddress,paymentMethod}= req.body

           if(orderItems && orderItems.length === 0){
            res.status(400)
            throw new Error('No order Items');
           } 

           const itemsfromDB = await Product.find({
            _id:{$in: orderItems.map((x)=>x._id)}
           })

         
        //    const matchingItemFromDB
           const dbOrderItems = orderItems.map((itemfromClient)=>{
                const matchingItemFromDB= itemsfromDB.find((itemFromDB)=>
                        itemFromDB._id.toString()===itemfromClient._id)
                
          

           if(!matchingItemFromDB){
            res.status(404)
            throw new Error(`Product not found ${itemfromClient._id}`)

           }

           return{
            ...itemfromClient,
            product:itemfromClient._id,
            price:matchingItemFromDB.price,
            id:undefined,
           };
        })
           const {itemsPrice,taxPrice,shippingPrice,totalPrice}= calcPrices(dbOrderItems);

           const order = new Order({
            orderItems:dbOrderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
           })

           const createdOrder = await order.save()
           res.status(201).json(createdOrder)

    } catch (error) {
        console.log(error);
        
        
    }
} 


const getAllOrders = async(req,res)=>{
            try {
                    const order = await Order.find({}).populate('user','id username')
                    res.json(order)
            } catch (error) {
            console.log(error)
            res.status(500).json({error:error.message})                
            }
}


const getUserOrders = async(req,res)=>{
    try {
        const getuser = await Order.find({user:req.user._id})
        res.json(getuser)
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
const countTotalOrders = async(req,res)=>{
    try {
        const totalOrders = await Order.countDocuments();
        res.json({ totalOrders });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    
    const calculateTotalOrders = async (req,res)=>{
                try {
                        const order = await Order.find()
                        const totalSales = order.reduce((sum,order)=>sum+order.totalPrice,0)
                        res.json({totalSales})
                } catch (error) {
                    res.status(500).json({erro:error.message})
                    
                }
    }


    const calculateTotalSalesbydate = async(req,res)=>{
        try {
            const salesByDate = await Order.aggregate([
              {
                $match: {
                  isPaid: true,
                },
              },
              {
                $group: {
                  _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
                  },
                  totalSales: { $sum: "$totalPrice" },
                },
              },
            ]);
        
            res.json(salesByDate);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        };

        const findOrderByID = async(req,res)=>{
            try {
                       const order = await Order.findById(req.params.id).populate("user","username email")  
                       
                       if(order){
                        res.json(order)
                       }
                       else{
                        res.status(404)
                        throw new Error('Order not found')
                       }

                
            } catch (error) {
                res.status(500).json({ error: error.message });

                
            }
        }

        const markOrderAsPaid = async(req,res)=>{
            try {
                const order = await Order.findById(req.params.Id)

                if(order){
                    order.ispaid = true,
                    order.paidAt = Date.now()

                    order.paymentResult={
                        id:req.params.id,
                        status:req.body.status,
                        update_time:req.body.update_time,
                        email_address:req.body.payer.email_address
                    }
                    const updatedOrder = await order.save()
                    res.status(200).json(updatedOrder)
                }
                else{
                    res.status(404)
                    throw new Error("Order not Found ")
                }

                
            } catch (error) {
                res.status(500).json({ error: error.message });

                
            }
        }

        const markOrderAsdeliverd =async(req,res)=>{
                    try {
                        const order =await Order.findById(req.params.id)
                    
                        if(order){
                            order.isDelivered=true,
                            order.deliveredAt = Date.now()

                            const updatedOrder = await order.save()
                            res.json(updatedOrder)
                        }
                        else{
                        
                        res.status(404)
                        throw new Error('Order not Found')
            }

                    } catch (error) {
                        res.status(500).json({ error: error.message });

                        
                    }    
        }
export {createOrder,
    getAllOrders,
    getUserOrders,
    countTotalOrders,
    calculateTotalOrders,
    calculateTotalSalesbydate,
    findOrderByID,
    markOrderAsPaid,
    markOrderAsdeliverd} 




