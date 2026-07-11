const express = require('express');
const router = express.Router();
const URL = require('../models/urlModel');

const {restrictTo} = require('../middlewares/authHeaders');

// restrictTo('NORMAL') is an Inline Middleware, that protects this route based on the user's role.
// router.get('/', restrictTo('NORMAL'), async (req,res)=>{ ... }

router.get('/admin/urls', restrictTo(["ADMIN"]), async(req,res)=>{
    const allurls = await URL.find({});
    res.render('home', {
        urls: allurls, // Pass all user's URLs to home.ejs for rendering.
    });
});

router.get('/', async (req,res)=>{

    // If the user is not authenticated, render the home page.
    if(!req.user) return res.render('home');
    console.log(req.user);
    // If the user is authenticated but does not have the required role, send an "Unauthorized User" response.
    if(req.user.role !== "ADMIN")
        if(req.user.role !== "NORMAL") return res.send('UnAuthorised User');
    const allurls = await URL.find({createdBy: req.user._id});
    res.render('home', {
        urls: allurls, // Pass all user's URLs to home.ejs for rendering.
    });
});

router.get('/signup', async (req,res)=>{
    res.render('signup');
});

router.get('/login', async (req,res)=>{
    res.render('login');
});

module.exports = router;