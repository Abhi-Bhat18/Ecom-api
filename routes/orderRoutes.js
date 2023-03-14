import express from 'express'
import { getOrders,createOrder} from '../controllers/orderController.js';
const router = express.Router()


router.get('',getOrders);
router.post('/create',createOrder);

export default router;