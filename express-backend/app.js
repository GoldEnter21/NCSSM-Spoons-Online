const express = require('express');
const connectDB = require('./project/config/db');
const cors = require('cors');

// routes
const users = require('./routes/api/users')
const locations = require('./routes/api/locations');

const app = express();
// Connecting to the MongoDB database
connectDB();
//cors for authentication
//{ origin: true, credentials: true }
app.use(cors());
// Init Middleware - allows Express to read with POST and PUT requests
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes  
app.use('/api/users', users);
app.use('/api/locations', locations);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
