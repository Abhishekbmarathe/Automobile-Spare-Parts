import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


const app = express()
const port = 3001


// Body parsing middleware for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting ejs template engine
app.set('view engine', 'ejs')
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));






app.get('/', (req, res) => { 
  res.render("index.ejs")
})


app.post("/parts", (req, res) => {
  res.render("parts");
})

app.post("/buy", (req,res) => {
  res.render("buy");
})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})