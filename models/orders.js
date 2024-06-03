import mongoose, { Types } from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    itemName:{ 
        type:String
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true,
    },
    address: {
        type: String,

    },
    userId: {
        type: String
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
