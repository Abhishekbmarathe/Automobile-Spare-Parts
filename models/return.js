// Import mongoose module
import mongoose from 'mongoose';

// Define schema using mongoose Schema class
const { Schema } = mongoose;

// Define the return schema
const returnSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true,
        // unique: true // Ensure orderId is unique
    },
    reason: {
        type: String,
        required: true
    }
});

// Create and export Return model
const Return = mongoose.models.Return || mongoose.model('Return', returnSchema);
export default Return;
