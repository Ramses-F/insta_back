const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const LoginSchema = mongoose.Schema({
    username: { type: String, required: true },
    password:{ type: String, required: true },
});

LoginSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Login', LoginSchema);