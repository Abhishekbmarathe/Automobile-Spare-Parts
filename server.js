import express from 'express'; // Importing Express.js framework
import bodyParser from 'body-parser'; // Middleware for parsing request bodies
import path from 'path'; // Module for handling file paths
import mongoose from 'mongoose'; // MongoDB object modeling tool
import login from './models/login.js'; // Importing login model (Assuming it's a Mongoose model)
import parts from './models/parts.js';
import nodemailer from 'nodemailer'; // Library for sending emails
import OTPGenerator from 'otp-generator'; // Library for generating OTPs
import session from 'express-session';
import crypto from 'crypto';
import { config } from 'dotenv';
await config();
import multer from 'multer';
import orders from './models/orders.js'
import Razorpay from 'razorpay';


const app = express() // Creating an Express application
const port = 3001 // Setting the port number

// Body parsing middleware for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/resources",express.static("resources"));
app.use(bodyParser.json());

// Setting EJS template engine and static file directory
app.set('view engine', 'ejs')
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MONGODB connected Successfully...");
    })
    .catch((e) => {
        console.log("MONGODB connection Failed...", e);
    })


// Configure Multer's storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination directory for uploads
        cb(null, path.join(__dirname, 'public', 'resources'));
    },
    filename: function (req, file, cb) {
        // Define the filename for the uploaded files
        const uniqueFileName = Date.now() + '-' + file.originalname;  // Example to avoid name conflicts
        cb(null, uniqueFileName);
    }
});
const upload = multer({ storage: storage });

// Configure session middleware

// const secret = crypto.randomBytes(32).toString('hex');
// console.log(secret);

app.use(session({
    secret: "fc9ef72da8c8b9a701c28369097b9361f5fdbc940a04c011d3028f6fbc74da23",// Choose a strong secret for session encoding
    resave: false, // Avoid resaving sessions that haven't changed
    saveUninitialized: false, // Don't save uninitialized sessions
    // cookie: {
    //     secure: process.env.NODE_ENV === "production", // Enable secure cookies in production (requires HTTPS)
    //     maxAge: 1000 * 60 * 60 * 24 // Set cookie expiry to one day
    // }
}));


function checkAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Access denied. Please login to continue.');
    }
}





// Route for rendering the home page
app.get('/', (req, res) => {
    res.render("index.ejs");
})

// Route for rendering the login page
app.get('/login', (req, res) => {
    res.render("login.ejs");
})

// Route for rendering the login page (possibly a typo in route)
app.get('/log', (req, res) => {
    res.render("login.ejs");
})

//return render
// app.get('/', (req, res) => {
//     res.render("return.ejs");
// })




// Route for rendering the signup page
app.get("/signup", (req, res) => {
    res.render("signup");
})

// Route for rendering the about page
app.get("/about", (req, res) => {
    res.render("about");
})

// Route for rendering the parts page
app.get("/parts", async (req, res) => {
    try {
        const { image_id } = req.query;

        console.log(image_id);
        // Ensure data is an array
        const data = await parts.find({company : image_id}) || [];

        // const data = await parts.find() || [];

        switch (image_id) {
            case "re":
                res.render("royalenfield", { data });
                break;
            case "ktm":
                res.render("ktm", { data });
                break;
            case "yamaha":
                res.render("yamaha", { data });
                break;
            case "suzuki":
                res.render("suzuki", { data });
                break;
            case "honda":
                res.render("honda", { data });
                break;
            case "bajaj":
                res.render("parts", { data });
                break;
            default:
                res.send("invalid bike");
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


// Route for rendering the buy page
app.get("/buy", async (req, res) => {
    const data = await parts.find();
    res.render("buy", { data });
})

// Route for rendering the accessories page
app.get("/accessories", (req, res) => {
    res.render("accessories");
})

// Route for rendering the purchase page
app.get("/purchase", (req, res) => {
    res.render("purchase");
})

// Route for rendering the user adress page
app.get("/useradress", (req, res) => {
    res.render("useradress");
})


// route for navigation
app.get('/navigate', (req, res) => {
    const { action } = req.query;
    switch (action) {
        case 'home':
            // Redirect to HOME page
            res.redirect('/');
            break;
        case 'contact_us':
            // Redirect to CONTACT US page
            res.redirect('/contact-us');
            break;
        case 'my_cart':
            // Redirect to My Cart page
            res.render("mycart.ejs");
            break;
        case 'my_orders':
            // Redirect to My order page
            res.render("myorder.ejs");
            break;

        default:
            // Handle unknown action
            res.status(404).send('Invalid action');
    }
});


// Route for rendering the cardspay page
app.get("/cardspay", (req, res) => {
    res.render("cardspay");
})

// Route for rendering the cod page
app.get("/cod", (req, res) => {
    res.render("cod");
})

// Route for rendering the oredersumary page
app.get("/ordersummary", (req, res) => {
    res.render("ordersummary");
})

// Route for rendering the payment page
app.get("/paymentmode", (req, res) => {
    res.render("paymentmode");
})

// Route for rendering the upi page
app.get("/upi", (req, res) => {
    res.render("upi");
})

// Route for rendering the codetails page
app.get("/codetails", async (req, res) => {
    const orderDetails = await orders.find({});
    res.render("codetails", { orderDetails });
})

app.get("/buynow", (req, res) => {
    res.render("ordernow")
})

app.post("/logout", (req, res) => {
    res.render("logout")
})

// Route for handling user sign up
app.post("/usersignin", async (req, res) => {
    const data = req.body;
    const Login = new login(data); // Creating a new login instance with user data
    await Login.save(); // Saving the user data to the database
    console.log(req.body); // Logging the user data
    res.render("home"); // Rendering the home page after signup
})
app

app.post("/submit", async (req, res) => {
    console.log(req.body);

    const order = new orders(req.body);
    await order.save();

    // console.log(await orders.find({}));

    res.send("success")
})

// Route for handling user login
app.post("/userlogin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (email == "supplier@gmail.com" && user.password === password) {
            const data = await parts.find();
            return res.render("supplier", { data });  // Correctly pass data within an object
        } else if (user.password !== password) {
            return res.status(401).send("Invalid password");
        }
        req.session.user = { id: user._id, username: user.email };
        res.render("home");

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
});

app.post("/add", upload.single('itemimg'), async (req, res) => {
    try {
        // Extract only the necessary part of the path from 'resources' directory onward
        let imagePath = req.file ? req.file.path.split('\\public\\')[1].replace(/\\/g, '/') : null;

        const product = new parts({
            ...req.body,
            itemimg: imagePath  // store only the relative path from 'resources/'
        });

        await product.save();
        const data = await parts.find();
        console.log(product);
        res.render("supplier", { data });  // Render the 'supplier' view with the list of products

    } catch (error) {
        console.error("Error during file upload:", error);
        res.status(500).send(error.message);
    }
});



app.post('/delete', async (req, res) => {
    try {
        const productId = req.body.productId; // Ensure you're accessing the right property from the body
        console.log(productId);

        const result = await parts.deleteOne({ _id: productId }); // Convert string to ObjectId
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
            res.send("deleted")
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
            res.send("No document found with that ID."); // Inform the user
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting the product.");
    }
});


// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID, // Replace with your key id from Razorpay dashboard
    key_secret: process.env.KEY_SECRET // Replace with your key secret
});

// Route to create an order
app.post('/create-order', async (req, res) => {
    const options = {
        amount: req.body.price * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log(order)
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route for payment verification (optional, based on your needs)
app.post('/verify-payment', (req, res) => {
    const secret = process.env.KEY_SECRET; // Your secret

    // Add your logic to verify payment signature
    // const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${req.body.razorpay_order_id}|${req.body.razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === req.body.razorpay_signature) {
        res.status(200).json({ message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid signature sent' });
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
