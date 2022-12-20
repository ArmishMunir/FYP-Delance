const mongoose = require('mongoose')

const bidSchema = new mongoose.Schema({
    summary: {
        type: String,
        require
    },
    price: {
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
    ownerId: {
        type: String,
        require
    },
    projectId: {
        type: String
    },
    freeLancerAddress: {
        type: String
    },
    bidStatus: {
        type: Boolean
    }

})

module.exports = mongoose.model('bid',bidSchema);