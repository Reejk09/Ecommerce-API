const express = require("express");

// const User = require("./model/Useri")
const fileUpload = require("express-fileupload")
const authRoutes = require("./route/auth")
const orderRoutes = require("./route/order")
const productsRoutes = require("./route/product");
const handleServerError = require("./middleware/handleServerError");
const app = express();
app.use(express.json())

app.use(fileUpload()); // handles form data 
// app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'))//serve static resources files
app.use("/api/products",productsRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/orders",orderRoutes)

require("./config/database")
app.use(handleServerError)

// fs.writeFileSync(path.join(path.resolve(),"custom.txt"),"ourkjds")

app.listen(8000,()=>{
    console.log("server started ");
})



