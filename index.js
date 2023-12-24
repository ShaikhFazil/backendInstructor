const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

require("dotenv").config();
const DB = require("./DB/Database");

//DATABASE CONNECTION
DB();

//ROUTES User Registration and Login
app.use("/api/v1", require("./routes/User"));



//ROUTES
app.use('/api/v1',require('./routes/contact'))


const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server is connected on port no ${PORT}`));
app.get("/", (req, res) => {
    res.send("Api EndPoint Working Fine...");
  });