const dotenv = require("dotenv");
dotenv.config();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const SERVICE_ACCOUNT_PATH = require(process.env.SERVICE_KEY);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const Redis = require('./lib/redis');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const redis = new Redis();

initializeApp({credential: cert(SERVICE_ACCOUNT_PATH)});
//console.log(serv);
const app = express();

//Dependecies
app.set('view engine', 'ejs');
//
//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads')));

//
const PORT = process.env.PORT || 5003;
const DBS = process.env.MONGOLAB_URI;

//
app.listen(PORT, () => {
    console.log("app running on port " + PORT);
})

//SET ROUTES RULES
app.use("/", require("./routes/indexRoute"));
app.use("/dashboard", require("./routes/dashboardRoute"));