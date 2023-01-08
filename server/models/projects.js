/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        require
    },
    projectDescription: {
        type: String,
        require
    },
    timeLine: {
        type: String,
        require
    },
    ownerAddress: {
        type: String,
        require
    },
    price: {
        type: Number,
        require
    },
    technologies: [{
        type: String
    }],
    file_path: {
        type: String,
        required: true
      },
    file_mimetype: {
        type: String,
        required: true
    },
    bidStatus: {
        type: Boolean
    },
    freelancerAddress: {
        type: String
    },
})

module.exports = mongoose.model('projects',projectSchema);
