/* eslint-disable no-unused-vars */
const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Contract = require("../models/contract");

router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~Contract/getall");
        console.table(req.body);

        let result = await Contract.find({});

        if (result == null) {
            resp.status(201).send("No Contract found!");
        }
        else {
            resp.status(200).json(result);
        }

    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
});


router.route("/get/:_id").get(async (req, resp) => {
    try {
        console.log("Route~Contract/get");
        

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Contract.findById({_id:req.params._id});
        if (result == null) {
            resp.status(201).send("Contract not found");
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
        console.log("Route~Contract/add");    
        console.table(req.body);

        Contract.init();
        const setid = new mongoose.Types.ObjectId();

        const contractData = new Contract({
            _id: setid,
            bidId: req.body.bidId,
            freeLancerAddr: req.body.freeLancerAddr,
            ownerAddress: req.body.ownerAddress,
            status: req.body.status,
            projectId: req.body.projectId

        });

        let result = await contractData.save();

        if (result == null) {
            resp.status(201).send("Contract not added");
        } else {
            resp.status(200).json(result);
        }
    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
});


router.route("/update/:id").put(async (req, resp) => {
    try {
        console.log("Route~Contract/update");
        console.table(req.body);

        let result = await Contract.updateOne({ _id: req.params.id }, { $set: req.body });

        if (result == null) {
            resp.status(201).send("Contract not updated");
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
