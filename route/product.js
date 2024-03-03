const express = require("express");
const { fetchProduct, updateProduct,storeProduct,deleteProduct,} = require("../controller/product");

const router = express.Router();


router.get("",fetchProduct)
router.post("",storeProduct)
router.put("/:_id",updateProduct)
router.delete("/:_id",deleteProduct)




module.exports = router;
