const mongoose = require('mongoose')

const perDataSchema = new mongoose.Schema({
    projectId: {
        type: String,
    },
    freelancerAddress: {
        type: String,
        require
    },
    ownerAddress: {
        type: String,
        require
    }
})

module.exports = mongoose.model('perData',perDataSchema);