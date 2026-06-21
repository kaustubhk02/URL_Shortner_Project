const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const {setUser, getUser} = require('../services/auth');

async function handleUserCreation(req, res){

    const body = req.body;

    await User.create({
        name: body.name,
        email: body.email,
        password: body.pass,
    });

    return res.redirect('/');
}

async function handleUserLogin(req, res){

    const body = req.body;

    const user = await User.findOne({
        email: body.email,
        password: body.pass,
    });

    if(!user) {
        console.log("Invalid user");
        return res.render('login');
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("loginUid", sessionId);
    
    console.log("Valid user");
    return res.redirect('/');
}

module.exports = {
    handleUserCreation,
    handleUserLogin,
}