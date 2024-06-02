// Import Mongoose
import mongoose from 'mongoose';

// Define the Product schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensure that the price cannot be negative
    },
    stock: {
        type: String,
        required: true,

    },
    itemimg: {
        type: String
    },
    model: {
        type: String
    },
    company: {
        type: String
    }

});

// Export the Product model
const Product = mongoose.model('Product', productSchema);
export default Product;
