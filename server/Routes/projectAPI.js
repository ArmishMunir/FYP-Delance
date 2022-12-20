/* eslint-disable no-unused-vars */
const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const Projects = require("../models/projects");

router.route("/getall").get(async (req, resp) => {
    try {
        console.log("Route~Projects/getall");
        console.table(req.body);

        let result = await Projects.find({});

        if (result == null) {
            resp.status(201).send("No project found!");
        }
        else {
            resp.status(200).json(result);
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
  
        let result = await Projects.findByIdAndUpdate(req.params._id, req.body, {
          price: req.body.price
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

router.route("/get/:_id").get(async (req, resp) => {
    try {
        console.log("Route~Projects/get");
        

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Projects.findById({_id:req.params._id});
        if (result == null) {
            resp.status(201).send("Project not found");
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
        console.log("Route~Projects/add");    
        console.table(req.body);

        Projects.init();
        const setid = new mongoose.Types.ObjectId();

        const projectData = new Projects({
            _id: setid,
            projectTitle: req.body.projectTitle,
            projectDescription: req.body.projectDescription,
            timeLine: req.body.timeLine,
            ownerAddress: req.body.ownerAddress,
            price: req.body.price,
            technologies: req.body.technologies,
            status: req.body.status

        });

        let result = await projectData.save();

        if (result == null) {
            resp.status(201).send("Project not added");
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
        console.log("Route~Projects/update");
        console.table(req.body);

        let result = await Projects.updateOne({ _id: req.params.id }, { $set: req.body });

        if (result == null) {
            resp.status(201).send("Project not updated");
        }
        else {
            resp.status(200).json(result);
        }

    } catch (err) {
        console.warn(err);
        resp.status(404).json("Err"); // Sending res to client some err occured.
    }
});

router.route("/update/:_id").put(async (req, resp) => {
    try {
        console.log("Route~Projects/update");
        console.table(req.body);
  
        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }
  
        let result = await Projects.findByIdAndUpdate(req.params._id, req.body, {
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

  router.route("/delete/:_id").delete(async (req, resp) => {
    console.log(req.params._id);
    try {
        console.log("Route~Projects/delete");
        console.table(req.body);

        // regex to check if the id is valid
        const reg = /^[0-9a-fA-F]{24}$/;
        if (!reg.test(req.params._id)) {
            resp.status(400).send("Invalid id");
        }

        let result = await Projects.findByIdAndDelete(req.params._id);
        

        if (result == null) {
            resp.status(201).send("Project not deleted");
        } else {
            resp.status(200).json(result);
        }
    }
    catch (err) {
        console.warn(err);

    }  // Sending res to client some err occured.
})

module.exports = router;
