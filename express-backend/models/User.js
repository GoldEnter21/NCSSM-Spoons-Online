const mongoose = require('mongoose');

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
    playerTarget: {
        type: mongoose.Mixed,
        required: false
    }

});

module.exports = User = mongoose.model('user', UserSchema);