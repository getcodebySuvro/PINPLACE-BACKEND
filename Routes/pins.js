const router = require("express").Router();
const Pin = require("../Models/Pin");

//Creating Pins
router.post("/",async (req,res)=>{
    const newPin = new  Pin(req.body);
    try{
        const SavedPin = await newPin.save();
        res.status(200).json(SavedPin);
    }
    catch(err){
        console.log(err);
    }
})
//Editing pins
router.put("/",async(req,res)=>{
    const editedPin = req.body;
    try{
      await  Pin.findByIdAndUpdate(editedPin.id,{
        username:editedPin.username,
        title:editedPin.title,
        description:editedPin.description,
        rating:editedPin.rating,
        lat:editedPin.lat,
        long:editedPin.long
      })
    res.status(200).send(editedPin)
    
     
    }
    catch(err){
        console.log(err)
    }
})
//Edit selected pins
router.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await Pin.findByIdAndDelete(id).exec();
        res.status(200).json("Deleted")
    }catch{
        console.log(err)
    }
})

//Delete all pins when acc deleted
router.delete("/deletepins/:currentuser",async(req,res)=>{
    const currentuser = req.params.currentuser;
    try{
        await Pin.deleteMany({username:currentuser})
        res.status(200).json("Deleted")
    }catch{
        console.log(err)
    }
})

//Get Pins
router.get("/",async(req,res)=>{
    try{
        const pins = await Pin.find();
        res.status(200).json(pins)
    }
    catch(err){
        console.log(err)
    }
})


//exporting router
module.exports = router