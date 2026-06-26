const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
// const {setUser, getUser} = require('../services/authStateFull');
const {setUser, getUser} = require('../services/authStateLess');

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
    /* STATEFUL AUTHENTICATION */
    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    // res.cookie("loginUid", sessionId);

    /* STATELESS AUTHENTICATION */
    /* With COOKIES */
    // const token = setUser(user);
    // console.log(token);
    // res.cookie("loginUid", token);
    
    // console.log("Valid user");
    // return res.redirect('/');

    /* WithOut Cookies and with Headers */
    const token = setUser(user);
    console.log(token);
    
    console.log("Valid user");
    return res.json({token});
}

module.exports = {
    handleUserCreation,
    handleUserLogin,
}