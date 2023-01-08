const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Personal = require("../models/perData");

router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~Personal/getall");
        console.table(req.body);
    
        let result = await Personal.find({});
    
        if (result == null) {
        resp.status(201).send("No Personal Data found!");
        } else {
        resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
});

router.route("/get/:_id").get(async (req, resp) => {
    try {
        console.log("Route~Personal/get");
        

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Personal.findById({_id:req.params._id});
        if (result == null) {
            resp.status(201).send("Personal Data not found");
        }
        else {
            resp.status(200).json(result);
        }
        
    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }

});

router.post('/add',async (req, resp) => {
    try {
        console.log("Route~Personal/add");    
        console.table(req.body);

        Personal.init();

        const personalData = new Personal({
            projectId: req.body.projectId,
            freeLancerAddr: req.body.freeLancerAddr,
            ownerAddress: req.body.ownerAddress
        });


        let result = await personalData.save();

        if (result == null) {
            resp.status(201).send("Personal Data not added");
        }
        else {
            resp.status(200).json(result);
        }
        
    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }

});

module.exports = router;
