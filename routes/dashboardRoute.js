const express = require('express');
const Authenticated = require("../middleware/authenticated");
const IndexController = require("../controller/indexController");
const router = express.Router();


router.get("/", Authenticated, async (req, res) => {
    res.render("auth/dashboard", {title: "Emailer's Dashboard"});
})

router.get("/smtp", Authenticated, async (req, res) => {
    res.render("auth/smtp", {title: "SMTP'S"});
});
router.post("/smtp", Authenticated, async (req, res) => {
    const indexController = new IndexController();
    return indexController.smtpAdd(req, res);
});


module.exports = router;