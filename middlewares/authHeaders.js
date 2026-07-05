const {getUser} = require('../services/authStateLess');

async function checkForAuthentication(req, res, next){
    // const userheader = req.headers["authorization"];
    // req.user = null;
    // if(!userheader || !userheader.startsWith('Bearer ')){
    //     return next();
    // }

    // const token = userheader.split('Bearer ')[1];
    // const user = getUser(token);

    // req.user = user;
    // return next();

    /* Cookie-based Authentication */
    const sessionId = req.cookies.loginUid;

    req.user = null;

    if (!sessionId) {
        return next();
    }

    const user = getUser(sessionId);

    req.user = user;

    return next();
}

// Each user document stores an array of roles.
function restrictTo(roles = []){ // Restricts users from accessing resources that are not permitted for their role.
    return function (req, res, next){
        if(!req.user) return res.redirect('/login');
        if(!roles.include(req.user.role)) return res.send('UnAuthorised User');
        return next();
    };
}

// async function restrictLoggedInUser(req, res, next){

//     // const userId = req.cookies.loginUid;
//     const userId = req.headers["authorization"];

//     if(!userId) {
//         console.log("No headers Found");
//         return res.redirect('/login');
//     }

//     const token = userId.split("Bearer ")[1]; // Bearer 23436fjs537njueu46
//     const user = getUser(token);
//     console.log(user);
//     if(!user) {
//         console.log("No User has such Uid");
//         return res.redirect('/login');
//     }

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next){

//     // const userId = req.cookies.loginUid;
//     // if(!userId) res.render('home');
//     const userId = req.headers["authorization"];
//     if(!userId) {
//         req.user = null;
//         return next();
//     }

//     const token = userId.split("Bearer ")[1]; // Bearer 23436fjs537njueu46
//     const user = getUser(token);
//     console.log(user);

//     req.user = user;
//     next();
// }

module.exports = {
    // restrictLoggedInUser,
    // checkAuth,
    checkForAuthentication,
    restrictTo,
}