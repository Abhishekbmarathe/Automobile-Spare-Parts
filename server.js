import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



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
mongoose.connect("mongodb://127.0.0.1:27017/authenticat")
    .then(() => {
        console.log("MONGODB connected Successfully...");
    })
    .catch((e) => {
        console.log("MONGODB connection Failed...", e);
    })




app.get('/', (req, res) => {
    res.render("index.ejs")
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





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})