import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    itemName: String,
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
    // paymentMethod: {
    //     type: String,
    //     required: true,
    //     enum: ['credit_debit', 'upi', 'cod']
    // },
    address: {
        type: String,

    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
