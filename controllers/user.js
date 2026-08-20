const mongoose = require('mongoose');
const { User } = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../services/auth');

async function handleUserRequest(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email, password
    });
    console.log("User signed in !");
    return res.redirect("/");

};

async function handleLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email, password
    });
    if (!user) {
        return res.render('login', {
            error: "Invalid username or password"
        });
    };
    const token = setUser(user.toObject());
    res.cookie("token", token);
    return res.redirect('/');

}

module.exports = { handleUserRequest, handleLogin };