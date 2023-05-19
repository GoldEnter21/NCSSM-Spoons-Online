const mongoose = require('mongoose');

/**
 * The data that will be included for the Locations in mongoDb server
 */
const LocationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    date: {
        type: String, 
        required: true
    },
    playerEliminator: {
        type: String,
        required: true
    },
    playerKilled: {
        type: String,
        required: true
    }

});

module.exports = Location = mongoose.model('location', LocationSchema);