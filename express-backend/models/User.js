const mongoose = require('mongoose');

/**
 * The data that will be included for the Users in mongoDb server
 */
const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    hall: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    playerEliminations: {
        type: Number,
        required: false
    },
    playerStatus: {
        type: String,
        required: false
    },
    deadOn: {
        type: String,
        required: false
    },
    playerTarget: {
        type: mongoose.Mixed,
        required: false
    },
    alias: {
        type: String,
        required: false
    },
    useAlias: {
        type: String,
        required: false
    },
    verified: {
        type: String,
        required: false
    },
    placement: {
        type: Number,
        required: false
    },
    prospectiveTarget: {
        type: mongoose.Mixed,
        required: false
    }
});

module.exports = User = mongoose.model('user', UserSchema);