const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./Routes/pins")
const cors = require("cors")
const userRoute = require("./Routes/users")
const port = process.env.PORT

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));


//Mongoose Connection
mongoose.connect("mongodb+srv://pinplace:pinplace50@cluster0.iryrr.mongodb.net/pindb?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.send("Pinplace is running")

})
app.use("/api/pins",pinRoute)
app.use("/api/users",userRoute)

//Listening
app.listen(port,()=>{
    console.log("PinPlace is running")
    
})