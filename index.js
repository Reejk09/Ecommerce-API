const express = require("express");
// const User = require("./model/Useri")
const authRoutes = require("./route/auth")
const productsRoutes = require("./route/product");
const handleServerError = require("./middleware/handleServerError");
const app = express();
app.use(express.json())
app.use("/api/products",productsRoutes)
app.use("/api/auth",authRoutes)
require("./config/database")
app.use(handleServerError)
app.listen(8000,()=>{
    console.log("server started ");
})



