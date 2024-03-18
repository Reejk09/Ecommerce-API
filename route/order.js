const express = require("express");
const createOrder = require("../controller/order");
const { chechkAuthentication, isBuyer } = require("../middleware/auth");
const router = express.Router();


router.post("",chechkAuthentication,isBuyer,createOrder)

module.exports = createOrder