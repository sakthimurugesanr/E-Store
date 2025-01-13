import express from "express";
const  router = express.Router();
import { authentiCate,authorizeAdmin } from '../middlewares/authMiddleware.js'
import {createOrder,getAllOrders,getUserOrders,countTotalOrders,calculateTotalOrders,calculateTotalSalesbydate,findOrderByID,markOrderAsPaid,markOrderAsdeliverd} from "../controllers/orderController.js"
router.route('/').post(authentiCate,createOrder).get(authentiCate,authorizeAdmin,getAllOrders)
router.route('/mine').get(authentiCate,getUserOrders)
router.route('/total-orders').get(countTotalOrders)
router.route('/total-sales').get(calculateTotalOrders)
router.route('/total-sales-by-date').get(calculateTotalSalesbydate)
router.route('/:id').get(authentiCate,findOrderByID)
router.route('/:id/pay').get(authentiCate,markOrderAsPaid)
router.route('/:id/deliver').put(authentiCate,authorizeAdmin,markOrderAsdeliverd)

    


export default router;