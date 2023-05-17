const express = require('express');
const router = express.Router();

// Load User model
const Location = require('../../models/Location');

// GET api/locations/test
router.get('/test', (req, res) => res.send('location route testing'));

// GET api/locations
router.get('/', (req, res)=> {
    Location.find()
    .then(location => res.json(location))
    .catch(err => res.status(404).json({ locationnotfound: "Location not Found" }));
});

// POST api/locations
router.post('/', (req, res) => {
    Location.create(req.body)
    .then(location => res.json({ msg: "Location created successfully" }))
    .catch(err => res.status(404).json({ error: "Unable to create location" }));
});



// ONLY USE THROUGH POSTMAN
// DELETE api/locations/
router.delete('/', (req, res) => {
    Location.deleteMany()
    .then(user => res.json({ msg: "All Users removed successfully" }))
    .catch(err => res.status(404).json({ error: "No such user found" }));
});
module.exports = router;
