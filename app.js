const express = require('express');
const mongoose = require('mongoose');
const authRouters = require('./routers/authRouters');
require('dotenv').config()


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = `mongodb+srv://pphu:UAof6Zx8Ki0HiVPS@firstdb.etcf2ay.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000)
    console.log("Ready!!!")
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRouters)