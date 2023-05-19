const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// GET api/users/test
router.get('/test', (req, res) => res.send('user route testing'));

// GET api/users
router.get('/', (req, res)=> {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ usernotfound: "User not Found" }));
});

// GET api/users/:id
// Get a user by their id
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({usernotfound: "User not Found" }));
});

// POST api/users
router.post('/', (req, res) => {
    User.create(req.body)
    .then(user => res.json({ msg: "User created successfully" }))
    .catch(err => res.status(404).json({ error: "Unable to create user" }));
});

// PUT api/users/:id
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => res.json({ msg: "User updated successfully" }))
    .catch(err => res.status(404).json({ error: "Unable to update the user in the db" }));
});

// DELETE api/users/:id
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
    .then(user => res.json({ msg: "User removed successfully" }))
    .catch(err => res.status(404).json({ error: "No such user found" }));
});

// POST api/users/register-user
router.post('/register-user', (req, res) => {
    User.create(req.body)
    .then(user => res.json({ msg: "User posted successfully" }))
    .catch(err => res.status(404).json({ error: "Unable to sign in user" }));
});



// ONLY USE THROUGH POSTMAN or some similar service
// DELETE api/users/
router.delete('/', (req, res) => {
    User.deleteMany()
    .then(user => res.json({ msg: "All Users removed successfully" }))
    .catch(err => res.status(404).json({ error: "No such user found" }));
});
module.exports = router;
