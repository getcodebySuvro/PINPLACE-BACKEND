const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./Routes/pins")
const userRoute = require("./Routes/users")
const port = process.env.PORT || 8800

dotenv.config();
const app = express();
app.use(express.json({limit:'50mb'}));


//Mongoose Connection
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err)
})

app.use("/api/pins",pinRoute)
app.use("/api/users",userRoute)

//Listening
app.listen(port,()=>{
    console.log("PinPlace is running")
    
})