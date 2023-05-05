const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    playerEliminations: {
        type: Number,
        required: true
    },
    playerIsAlive: {
        type: Boolean,
        required: true
    },
});

module.exports = User = mongoose.model('user', UserSchema);