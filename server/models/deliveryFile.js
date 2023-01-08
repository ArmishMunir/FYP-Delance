const mongoose = require('mongoose')

const deliveryFileSchema = new mongoose.Schema({
    file_path: {
        type: String,
        required: true
      },
    file_mimetype: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('deliveryFile', deliveryFileSchema);
