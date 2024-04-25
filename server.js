import express from 'express'; // Importing Express.js framework
import bodyParser from 'body-parser'; // Middleware for parsing request bodies
import path from 'path'; // Module for handling file paths
import mongoose from 'mongoose'; // MongoDB object modeling tool
// import bcrypt from 'bcrypt'; // Library for hashing passwords
import login from './models/login.js'; // Importing login model (Assuming it's a Mongoose model)
import parts from './models/parts.js'
import nodemailer from 'nodemailer'; // Library for sending emails
import OTPGenerator from 'otp-generator'; // Library for generating OTPs
import { ObjectId } from 'mongodb';
const app = express() // Creating an Express application
const port = 3001 // Setting the port number

// Body parsing middleware for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting EJS template engine and static file directory
app.set('view engine', 'ejs')
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Database connection
mongoose.connect("mongodb+srv://shreyask253:arwK7keJwYJUZNBq@spare-db.q71dn1b.mongodb.net/?retryWrites=true&w=majority&appName=spare-db")
    .then(() => {
        console.log("MONGODB connected Successfully...");
    })
    .catch((e) => {
        console.log("MONGODB connection Failed...", e);
    })

// Route for rendering the home page
app.get('/', (req, res) => {
    res.render("index.ejs");
})

// Route for rendering the login page
app.post('/login', (req, res) => {
    res.render("login.ejs");
})

// Route for rendering the login page (possibly a typo in route)
app.post('/log', (req, res) => {
    res.render("login.ejs");
})




// Route for rendering the signup page
app.post("/signup", (req, res) => {
    res.render("signup");
})

// Route for rendering the about page
app.post("/about", (req, res) => {
    res.render("about");
})

// Route for rendering the parts page
app.post("/parts", (req, res) => {
    res.render("parts");
})

// Route for rendering the buy page
app.post("/buy", (req, res) => {
    res.render("buy");
})

// Route for rendering the accessories page
app.post("/accessories", (req, res) => {
    res.render("accessories");
})

// Route for rendering the purchase page
app.post("/purchase", (req, res) => {
    res.render("purchase");
})

// Route for rendering the user adress page
app.post("/useradress", (req, res) => {
    res.render("useradress");
})




// Route for rendering the cardspay page
app.post("/cardspay", (req, res) => {
    res.render("cardspay");
})

// Route for rendering the cod page
app.post("/cod", (req, res) => {
    res.render("cod");
})

// Route for rendering the oredersumary page
app.post("/ordersummary", (req, res) => {
    res.render("ordersummary");
})

// Route for rendering the payment page
app.post("/paymentmode", (req, res) => {
    res.render("paymentmode");
})

// Route for rendering the upi page
app.post("/upi", (req, res) => {
    res.render("upi");
})



// Route for handling user sign up
app.post("/usersignin", async (req, res) => {
    const data = req.body;
    const Login = new login(data); // Creating a new login instance with user data
    await Login.save(); // Saving the user data to the database
    console.log(req.body); // Logging the user data
    res.render("home"); // Rendering the home page after signup
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

        res.render("home");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal server error");
    }
});

app.post("/add", async (req, res) => {
    try {
        const product = new parts(req.body);
        await product.save();
        const data = await parts.find();
        console.log(data);
        res.render("supplier", { data });  // Correctly pass data within an object
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/delete', async (req, res) => {
    try {
        const productId = req.body.productId; // Ensure you're accessing the right property from the body
        console.log(productId);

        const result = await parts.deleteOne({ _id: productId}); // Convert string to ObjectId
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




// Route for rendering the forgot password page
// app.post("/forgot", (req, res) => {
//     console.log(req.body);
//     res.render("forgotpass");
// })

// Route for generating and sending OTP to user's email
app.post('/otp', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is registered
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate OTP
        const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

        // Update user's OTP in the database
        user.otp = otp;
        await user.save();

        // Send OTP to user's email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your.email@gmail.com', // Replace with your email
                pass: 'your-email-password' // Replace with your email password
            }
        });

        await transporter.sendMail({
            from: 'your.email@gmail.com', // Replace with your email
            to: email,
            subject: 'One Time Password (OTP)',
            text: `Your OTP is: ${otp}`
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
