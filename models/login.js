import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const loginSchema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number // Change the type to Number
    }
    // You can add more fields like name, role, etc. based on your requirements
}, { timestamps: true });

const Login = model('Login', loginSchema);

export default Login;
