const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const uniqueValidator = require('mongoose-unique-validator');
 

const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true},
		middleName: {type: String},
		lastName: {type: String},
    gender: {type: String},
    username:{type: String, required: true, unique:true, dropDups: true},
		email: {type: String, required: true},
		password: {type: String, required: true},
		birthdate: {type: String},
		address: { streetAddress: {type: String},
                    city: {type: String},
                    state: {type: String},
                    postalCode: {type: String},
                    country: {type: String},
                    latitude: {type: Number},
                    longitude:{type: Number}
              },
		admin: {type: Boolean},
    provider: {type: String},
    image: {type: String}
    
});

UserSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername= function(username, callback){
  const query ={username: username};
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10,(err, salt) =>{
    bcrypt.hash(newUser.password, salt,  (err, hash)=>{
      if(err) throw err;
      newUser.password=hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash,callback){
  bcrypt.compare(candidatePassword, hash,(err,isMatch)=>{
    if(err) throw err;
    callback(null ,isMatch);
  });
}
