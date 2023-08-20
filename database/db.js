const mongoose = require('mongoose');
const {DB_URI, DB_USER, DB_PASSWORD, MONGO_DBNAME} = require('../config/config')

// const dbURI = process.env.NODE_ENV === 'development' ? process.env.DB_URI_PROD : process.env.DB_URI_DEV;
// const secretKey = process.env.NODE_ENV === 'development' ? process.env.SECRET_KEY_PROD : process.env.SECRET_KEY_DEV;

const connectDB = () => {
  try {
    mongoose.connect(`${DB_URI}${DB_USER}:${DB_PASSWORD}@cluster0.wejxqkx.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    console.log('[db] Connected to', MONGO_DBNAME );
  } catch (error) {
    console.log('error :>> ', error);
  }
};


module.exports = {
  connectDB
};