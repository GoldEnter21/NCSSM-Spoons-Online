const express = require('express');
const connectDB = require('./project/config/db');
const cors = require('cors');

// routes
const users = require('./routes/api/users')
const app = express();
// Connecting to the MongoDB database
connectDB();
//cors for authentication
app.use(cors({ origin: true, credentials: true }));
// Init Middleware - allows Express to read with POST and PUT requests
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/users', users);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));