const express = require('express');

const router = express.Router();


router.get("/", async (req, res) => {
    res.render("auth/dashboard", {title: "Emailer's Dashboard"});
})

router.get("/smtp", async (req, res) => {
    res.render("auth/smtp", {title: "SMTP'S"});
})


module.exports = router;