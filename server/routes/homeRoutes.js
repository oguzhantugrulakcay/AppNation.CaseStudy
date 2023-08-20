const express = require('express')
const router=express.Router();
const auth=require("../middleware/auth")

const {
    login,
    userRole
}=require('../controllers/homeController')

router.route("/").post(login).patch(auth,userRole)

module.exports=router;