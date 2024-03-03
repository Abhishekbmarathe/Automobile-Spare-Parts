import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


const app = express()
const port = 3000


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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})