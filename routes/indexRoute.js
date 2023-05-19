const express = require('express');
const IndexController = require("../controller/indexController");
const secured = require("../auth/protect");

//Initializer'
const indexController = new IndexController();

const router = express.Router();

router.get("/", async (req, res) => {
    return indexController.loginAction(req, res);
})
router.post("/", async (req, res) => {
    return indexController.loginAction(req, res);
})

router.get("/forgot_password", async (req, res) => {
    res.render("recovery", {title: "Recover your account password"});
})

router.get("/create_account", async (req, res) => {
    return indexController.registerAction(req, res);
})
router.post("/create_account", async (req, res) => {
    return indexController.registerAction(req, res);
})
router.post("/", async (req, res) => {
    return indexController.registerAction(req, res);
})


module.exports = router;