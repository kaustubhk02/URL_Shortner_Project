const express = require('express');
const router = express.Router();
const URL = require('../models/urlModel');

router.get('/', async (req,res)=>{
    if(!req.user) return res.render('home');
    const allurls = await URL.find({createdBy: req.user._id});
    res.render('home', {
        urls: allurls, // passing this can be used in home.ejs for further operations
    });
});

router.get('/signup', async (req,res)=>{
    res.render('signup');
});

router.get('/login', async (req,res)=>{
    res.render('login');
});

module.exports = router;