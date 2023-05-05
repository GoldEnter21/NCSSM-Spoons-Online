const mongoose = require('mongoose');
const config = require('./default.json');
const db = config.mongoURI;

const connectDB = async () => {
  try {
    // console.log(db);
    mongoose.set('strictQuery', true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;