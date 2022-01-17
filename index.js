
require('dotenv').config();
const MoviesModel = require('./database/movies');
const UsersModel = require('./database/users');


//import mongoose module
const mongoose = require('mongoose');
//set up default mongoose connection
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log("Connection Established"));

const express = require("express");
const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

//-----------------------------------------------GET API--------------------------------------------------------

app.get("/",(req,res) => {
    return res.json("Welcome, to the Backend of Book My Show ");
})


//GET all movies
app.get("/movies",async (req,res) => {
    const getAllMovies = await MoviesModel.find(); //anything in green colour means that returns a promise
    return res.json(getAllMovies); //return because we want program to end after getting all the books
    //res.send(getAllBooks) same thing no difference //but json is the best exchange medium
});

//GET single movie
app.get("/movie/:id",async (req,res)=> {
    const {id} = req.params;
    const getOneMovie = await MoviesModel.findOne({_id:id});
    return res.json(getOneMovie);
});

/**
 * Route                /user-register
 * Description          post single user details
 * Access               public
 * Parameter            none
 * Method               POST
 */
app.post("/user-register", async(req,res) =>{
    const addUser = await UsersModel.create(req.body);
    return res.json({
        userAdded : addUser,
        message : "user added successfully!!"
    })
});
const PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`App is running on port ${PORT}`);
});
