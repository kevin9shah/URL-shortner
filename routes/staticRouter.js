const express = require("express");
const URL = require("../models/url");
const { route } = require("./url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/url", restrictTo(['admin']),async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,

    });
})

router.get("/", restrictTo(['normal', 'admin']),async (req, res) => {
 
    const allUrls = await URL.find({createdBy : req.user._id});
    return res.render("home", {
        urls: allUrls
    });
});

router.get("/signup", (req,res) => {
   return res.render("signup"); 
});

router.get('/login', (req,res) => {
    return res.render("login")
});


module.exports = router;
