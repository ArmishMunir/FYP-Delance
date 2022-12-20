const router = require("express").Router();
const {schemaSignup, validate} = require('../models/signup')
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try{
        const {err} = validate(req.body);
        if(err) {
            return res.status(400).send({message: "Nahi ho rha bhai!!"});   
        }
        const userExists = await schemaSignup.findOne({email:req.body.email});  
        if(userExists) {
            return res.status(409).send({message: "Masha'Allah Already a member.!💖, try to remember login info"});
        }
        const excryptedPass = await bcrypt.genSalt(Number(process.env.VAL));
        const hashedPass = await bcrypt.hash(req.body.password, excryptedPass);

        await new schemaSignup({...req.body, password:hashedPass}).save();
        res.status(201).send({message: "Welcome to Delance fam! 🤱"});
    }catch(err) {
        res.status(500).send({message: "Server Errors! 🤦"})
    }
})

// get a user by id..
router.route("/get/:_id").get(async (req, resp) => {
    try {
        console.log("Route~schemaSignup/get");

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await schemaSignup.findById({_id:req.params._id});
        if (result == null) {
            resp.status(201).send("User not found!");
        }
        else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }

});

// get al the users
router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~schemaSignup/getall");
        let result = await schemaSignup.find();
        if (result == null) {
            resp.status(201).send("No user exists yet!");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
}
); 


module.exports = router;