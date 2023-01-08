const mongoose = require('mongoose')

const perDataSchema = new mongoose.Schema({
    projectId: {
        type: String,
    },
    freeLancerAddr: {
        type: String,
        require
    },
    ownerAddress: {
        type: String,
        require
    }
})

module.exports = mongoose.model('perData',perDataSchema);