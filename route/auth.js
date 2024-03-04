const express = require("express")
const {signUp,login } =
require("../controller/user")
const {checkAuthentication} = require("../middleware/auth")

const router = express.Router();


router.post("/signup",signUp)
router.post("/login",login)



module.exports = router;