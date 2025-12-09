const express = require('express');
const session = require('express-session');
const bookRouter = require('./routes/bookRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const dotenv = require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET;

app.use(express.static(path.join(__dirname, '../client/public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: sessionSecret, // Replace with a strong, random secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    if (Object.keys(req.query).length > 0) {
        const username = req.session.username;
        res.render("index", { username: username });
    }
    else {
        res.render("index", { username: undefined });
    }
});

app.use(methodOverride('_method'));
app.use("/books", bookRouter);
app.use("/users", userRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("There's an error when connecting to the database")
    });
    
module.exports = app;