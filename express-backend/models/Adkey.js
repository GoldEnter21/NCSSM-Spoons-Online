const mongoose = require('mongoose');

/**
 * The data that will be included for the Adkey in mongoDb server
 */
const AdkeySchema = new mongoose.Schema({
    adkey: {
        type: String,
        required: true
    },
});

module.exports = Adkey = mongoose.model('adkey', AdkeySchema);