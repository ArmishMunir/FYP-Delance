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
    bidStatus: {
        type: Boolean
    }
})

module.exports = mongoose.model('projects',projectSchema);