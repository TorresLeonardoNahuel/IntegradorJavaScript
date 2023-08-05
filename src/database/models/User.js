const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },image: {
        type: String,
        required: true
    }
    }, 
{
    timestamps: true,
    collection: 'users' 
});

const User = mongoose.model('User', userSchema);

module.exports = User;