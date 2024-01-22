const express = require('express');
const router = express.Router();

const Adkey = require('../../models/Adkey');

// GET api/adkey/test
router.get('/test', (req, res) => res.send('location route testing'));

// GET api/locations
router.get('/', (req, res)=> {
    Adkey.find()
    .then(adkey => res.json(adkey))
    .catch(err => res.status(404).json({ adkeynotfound: "Admin Passkey not Found" }));
});

module.exports = router;