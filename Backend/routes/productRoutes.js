import express from "express";
import formidable from 'express-formidable'

import { authentiCate,authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {addProduct,updateProductDetails,removeProduct,fetchItems,fetchProductById,getAllProducts,addProductReview,fetchTopproducts,fetchNewProducts,filterProducts} from '../controllers/productController.js'

const router = express.Router();

router.route('/fetchAllproducts').get(getAllProducts)
router.route('/:id/reviews').post(authentiCate,checkId,addProductReview)
router.get('/top',fetchTopproducts)
router.get('/new',fetchNewProducts)

router.route('/').get(fetchItems).post(authentiCate,authorizeAdmin, formidable(),addProduct);
router.route('/:id').put(authentiCate,authorizeAdmin,formidable(),updateProductDetails)
.delete(authentiCate,authorizeAdmin,checkId,removeProduct)
.get(fetchProductById);

router.route('/filtered-products').post(filterProducts)

export default router