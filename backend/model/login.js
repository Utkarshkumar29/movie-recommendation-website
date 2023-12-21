const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
      },
      password:{
        type:String,
        required:true
    }
});

const Register = mongoose.model('raise', registerSchema);

module.exports = Register;
