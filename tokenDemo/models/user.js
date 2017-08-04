const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;