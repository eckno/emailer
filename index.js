const express = require("express");
const admin = require("firebase-admin");
const liquidjs = require("liquidjs");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const serviceAccount = require("./emailer-6f9eb-firebase-adminsdk-zwg5c-cc2535e7e8.json");

//Initializers
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const app = express();
const engine = new liquidjs.Liquid();

//Dependecies
app.engine("liquid", engine.express());
app.set('view engine', 'liquid');
//
//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads')));

//
//SETUP DBS
dotenv.config();
//
const PORT = process.env.PORT || 5003;
const DBS = process.env.MONGOLAB_URI;

//
mongoose.connect(DBS, {useUnifiedTopology: true, useNewUrlParser: true})
.then( async () => {
    app.listen(PORT, () => {
        console.log("app running on port " + PORT);
    })
})
.catch((error) => console.log(error));

//SET ROUTES RULES
app.use("/", require("./routes/indexRoute"));
app.use("/dashboard", require("./routes/dashboardRoute"));