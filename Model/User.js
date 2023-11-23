const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean,
  date:{
        type:Date,
        default:Date.now
    }
});

// Create the User model
module.exports = mongoose.model('User', userSchema);