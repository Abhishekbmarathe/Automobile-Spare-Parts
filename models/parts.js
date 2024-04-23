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
    category: {
        type: String,
        required: true,
       
    },
    // stock: {
    //     type: Boolean,
    //     default: false // Stock is false by default, indicating not available
    // }
});

// Export the Product model
const Product = mongoose.model('Product', productSchema);
export default Product;
