const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
//Register
router.post("/register",async(req,res)=>{
    const user = await User.findOne({username:req.body.username});
    const email = await User.findOne({email:req.body.email});
    if(!user && !email){
        try{
            //hashing the password to store in DB
            const salt = await bcrypt.genSalt(10);
            const securedpassword = await bcrypt.hash(req.body.password,salt);
    
            //create new user
            const newUser = new User({
                username:req.body.username,
                email:req.body.email,
                password:securedpassword,
                imageurl:req.body.imageurl
            })
            //save new user
            const user = await newUser.save();
            res.status(200).json({_id:user._id,imageurl:user.imageurl});
    
        }catch(err){
            console.log(err)
        }
        }else{
            res.json("UserExists")
        }
    
   
})


//Login
router.post("/login",async (req,res)=>{
    try{
        //find user
        const user = await User.findOne({username:req.body.username})
       
        if(!user) {res.status(400).json("Wrong username or password")}
        //validate password
        if(user){
            const validPassword = await bcrypt.compare(req.body.password,user.password)
        if(!validPassword) {res.status(400).json("Wrong username or password")}
        
        //sendin response
        if(user && validPassword)
        {res.status(200).json({_id:user._id,username:user.username,pic:user.imageurl,email:user.email})}
        }else{
            return ;
        }
        
    }catch(err){
        console.log(err)
    }
})

//Delte Acc
router.delete("/deleteacc/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await User.findByIdAndDelete(id).exec();
        res.status(200).json("Deleted")
    }catch(err){
        console.log(err)
    }
})




module.exports = router