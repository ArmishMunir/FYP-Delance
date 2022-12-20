const router = require('express').Router();
const {schemaSignup} = require('../models/signup');
const joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async(req, res)=> {
    try{
        const {err} = validate(req.body);
        if(err) {
            return res.status(400).send({message: err.details[0].message});
        }
        const userExists = await schemaSignup.findOne({email:req.body.email});  
        if(!userExists) {
            return res.status(409).send({message: "Sad you don't belong to Delance fam.!😕, Please Sigup.!"});
        }
        const validPassword = await bcrypt.compare(
            req.body.password, userExists.password  
        )
        if(!validPassword) {
            return res.status(409).send({message: "Invalid Email or Password... 🤯"});
        }
        const token = userExists.generateAuthToken();
        console.log("Sign in Successful!")
        // 
        res.status(200).send({data:token ,message: "(Marhabaa..!)Logged in Successful. 🤝"})
    }catch(err) {
        console.log(err);
        res.status(500).send({message: "Server Error! 🤦"})
    }
})

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().label('email'),
        password: joi.string().required().label('password')
    })
    return schema.validate(data);
}

module.exports = router;
