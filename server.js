import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
import login from './models/login.js';
import nodemailer from 'nodemailer';
import OTPGenerator from 'otp-generator';



const app = express()
const port = 3001


// Body parsing middleware for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting ejs template engine
app.set('view engine', 'ejs')
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));


// database connection
mongoose.connect("mongodb+srv://shreyask253:arwK7keJwYJUZNBq@spare-db.q71dn1b.mongodb.net/?retryWrites=true&w=majority&appName=spare-db")
    .then(() => {
        console.log("MONGODB connected Successfully...");
    })
    .catch((e) => {
        console.log("MONGODB connection Failed...", e);
    })



app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.post('/login', (req, res) => {
    res.render("login.ejs")
})

app.post("/signup", (req, res) => {
    res.render("signup");
})

app.post("/parts", (req, res) => {
    res.render("parts");
})

app.post("/buy", (req, res) => {
    res.render("buy");
})
app.post("/accessories", (req, res) => {
    res.render("accessories");
})
app.post("/usersignin", async (req, res) => {

    const data = req.body;
    const Login = new login(data);
    await Login.save();
    console.log(req.body);
    res.render("home");

})
app.post("/userlogin", async (req, res) => {

    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await login.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Passwords match, authentication successful
        res.render("home");

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



app.post("/forgot", (req, res) => {
    console.log(req.body);
    res.render("forgotpass");
})







// otp section
// Generate and send OTP to user's email
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
                user: 'your.email@gmail.com',
                pass: 'your-email-password'
            }
        });

        await transporter.sendMail({
            from: 'your.email@gmail.com',
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






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})