/* eslint-disable no-unused-vars */
const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Bid = require("../models/bid");

router.route("/getall").get(async (req, resp) => {
  try {
    console.log("Route~Bid/getall");
    console.table(req.body);

    let result = await Bid.find({});

    if (result == null) {
      resp.status(201).send("No Bid found!");
    } else {
      resp.status(200).json(result);
      // console.log(result);
    }
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/getByProjectId/:_id").get(async (req, resp) => {
  try {
    console.log("Route~Bid/getByProjectId");
    console.table(req.body);

    let result = await Bid.find({ projectId: req.params._id });

    if (result == null) {
      resp.status(201).send("No Bid found!");
    } else {
      console.log(result);
      resp.status(200).json(result);
      console.log(result);
    }
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/update/:_id").put(async (req, resp) => {
  try {
      console.log("Route~Bid/update");
      console.table(req.body);

      // regex to check if the id is valid
      const reg = /^[0-9a-fA-F]{24}$/;
      if (!reg.test(req.params._id)) {
          resp.status(400).send("Invalid id");
      }

      let result = await Bid.findByIdAndUpdate(req.params._id, req.body, {
        bidStatus: true
      });
      
      if (result == null) {
          resp.status(201).send("Bid not updated");
      } else {
          resp.status(200).json(result);
      }
  }
  catch (err) {
      console.warn(err);
  }
})

// get by freelancerid
router.route("/getByFreelancerAddr/:freeLancerAddress").get(async (req, resp) => {
    try {
      console.log("Route~Bid/getByFreelancerAddr");
      console.table(req.body);
  
      let result = await Bid.find({ freeLancerAddress: req.params.freeLancerAddress });
  
      if (result == null) {
        resp.status(201).send("No Bid found!");
      } else {
        console.log(result);
        resp.status(200).json(result);
        console.log(result);
      }
    } catch (err) {
      console.warn(err);
      resp.status(404).json("Err"); // Sending res to client some err occured.
    }
  });

router.route("/get/:_id").get(async (req, resp) => {
  try {
    console.log("Route~Bid/get");

    // regex to check if the id is valid
    const reg = /^[0-9a-fA-F]{24}$/;
    if (!reg.test(req.params._id)) {
      resp.status(400).send("Invalid id");
    }

    let result = await Bid.findById({ _id: req.params._id });
    if (result == null) {
      resp.status(201).send("Bid not found");
    } else {
      resp.status(200).json(result);
    }
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

router.route("/getBidStauts/:_id").get(async (req, resp) => {
    try {
      console.log("Route~Bid/get");
  
      // regex to check if the id is valid
      const reg = /^[0-9a-fA-F]{24}$/;
      if (!reg.test(req.params.bidStatus)) {
        resp.status(400).send("Invalid bidStatus");
      }
  
      let result = await Bid.findById({ _id: req.params.id });
      if (result == null) {
        resp.status(201).send("Bid not found");
      } else {
        resp.status(200).json(result);
      }
    } catch (err) {
      console.warn(err);
      resp.status(404).json("Err"); // Sending res to client some err occured.
    }
  });

router.post("/add", async (req, resp) => {
  try {
    console.log("Route~Bid/add");
    console.table(req.body);

    Bid.init();
    const setid = new mongoose.Types.ObjectId();

    const bidData = new Bid({
      _id: setid,
      summary: req.body.summary,
      timeLine: req.body.timeLine,
      ownerAddress: req.body.ownerAddress,
      price: req.body.price,
      projectId: req.body.projectId,
      ownerId: req.body.ownerId,
      freeLancerAddress: req.body.freeLancerAddress,
      bidStatus: false,
    });

    let result = await bidData.save();

    if (result == null) {
      resp.status(201).send("Bid not added");
    } else {
      resp.status(200).json(result);
    }
  } catch (err) {
    console.warn(err);
    resp.status(404).json("Err"); // Sending res to client some err occured.
  }
});

module.exports = router;
