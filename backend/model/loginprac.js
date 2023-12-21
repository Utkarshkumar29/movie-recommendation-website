const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
});

const Register = mongoose.model('prac', registerSchema);

module.exports = Register;
