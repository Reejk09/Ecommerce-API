const express = require("express");
const { fetchProduct, updateProduct,storeProduct,deleteProduct,} = require("../controller/product");
const { chechkAuthentication,isSeller } = require("../middleware/auth");

const router = express.Router();
// const { checkAuthentication } = require("../middleware/auth")





router.get("",fetchProduct)
router.post("",chechkAuthentication,isSeller,storeProduct)
router.put("/:_id",updateProduct)
router.delete("/:_id",deleteProduct)




module.exports = router;
