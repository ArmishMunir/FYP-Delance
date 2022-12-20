const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const joi = require('joi');
const passComplexity = require('joi-password-complexity');

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    phoneNumber: {
        type: Number,
        require
    },
    password: {
        type: String,
        require
    },
    role: {
        type: String,
        require
    }
})

SignupSchema.methods.generateAuthToken = function() {
    const JWTPRIVATEKEY='c30cd194a80071b3b5ccbbc6ef0f5522faf220fc40de30f47e59e661a4b8ac96c65d17ed2977528e96f256e4f55f03bb3558e043d3d8161ec40df954d94ad567';
    // console.log("Secret Key: ", `${process.env.JWTPRIVATEKEY}`);
    const token = jwt.sign({
        _id:this._id
    }, JWTPRIVATEKEY, {
        expiresIn:"7d"
    });
    
    return token;
}

const schemaSignup = mongoose.model("schemaSignup", SignupSchema);

const validate = (data) => {
    const schema = joi.object({
        name: joi.string().label('name'),
        email: joi.string().email().label('email'),
        phineNumber: joi.number().required().label('phoneNuber'),
        password: passComplexity().required().label('password'),
        role: joi.string().label('role')
    })
    return schema.validate(data);
} 
module.exports = {schemaSignup,validate};