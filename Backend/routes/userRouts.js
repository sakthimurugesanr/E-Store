import express from "express";
import { creatUser,
    loginuser,
    logoutuser,
    getAllUser,
    getUserProfile,
    updateUser,
    deleteUserById,getUserById,
    updateById
} from "../controllers/userController.js";

import { authentiCate,authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").post(creatUser).get(authentiCate,authorizeAdmin,getAllUser);
router.post('/auth',loginuser);
router.post('/logout',logoutuser);

router.route("/profile").get(authentiCate,getUserProfile).put(authentiCate,updateUser)
router.route("/:id").delete(authentiCate,authorizeAdmin,deleteUserById).get(authentiCate,authorizeAdmin,getUserById)
.put(authentiCate,authorizeAdmin,updateById)




export default router;  