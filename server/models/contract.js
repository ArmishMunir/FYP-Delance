const mongoose = require('mongoose')

const contractSchema = new mongoose.Schema({
    bidId: {
        type: String,
    },
    freeLancerAddr: {
        type: String,
        require
    },
    ownerAddress: {
        type: String,
        require
    },
    status: {
        type: Boolean,
    },
    projectId: {
        type: String
    }
})

module.exports = mongoose.model('contract',contractSchema);