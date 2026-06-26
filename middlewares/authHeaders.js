const {getUser} = require('../services/authStateLess');

async function restrictLoggedInUser(req, res, next){

    // const userId = req.cookies.loginUid;
    const userId = req.headers["authorization"];

    if(!userId) {
        console.log("No headers Found");
        return res.redirect('/login');
    }

    const token = userId.split("Bearer ")[1]; // Bearer 23436fjs537njueu46
    const user = getUser(token);
    console.log(user);
    if(!user) {
        console.log("No User has such Uid");
        return res.redirect('/login');
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next){

    // const userId = req.cookies.loginUid;
    // if(!userId) res.render('home');
    const userId = req.headers["authorization"];

    const token = userId.split("Bearer ")[1]; // Bearer 23436fjs537njueu46
    const user = getUser(token);
    console.log(user);

    req.user = user;
    next();
}

module.exports = {
    restrictLoggedInUser,
    checkAuth,
}