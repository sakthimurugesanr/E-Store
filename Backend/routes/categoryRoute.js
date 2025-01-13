import express from "express";
const router = express.Router();
import { authentiCate,authorizeAdmin } from "../middlewares/authMiddleware.js";
import { createCategory,updateByID,deleteByID,listCategories,readCategory} from "../controllers/categoryController.js";

router.route('/').post(authentiCate, authorizeAdmin, createCategory);
router.route('/:categoryId').put(authentiCate, authorizeAdmin, updateByID);
router.route('/:categoryId').delete(authentiCate, authorizeAdmin, deleteByID);
router.route('/categories').get(listCategories);
router.route('/:id').get(readCategory)


export default router;