const express = require('express')
const router=express.Router();
const auth=require("../middleware/auth")

const {
    list,
    detail,
    create,
    update,
    remove
}=require('../controllers/usersController')

router.route("/").patch(auth,list).post(auth,create)
router.route("/:id/Detail").patch(auth,detail).post(auth,update).delete(auth,remove)

module.exports=router;