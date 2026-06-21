const {nanoid} = require('nanoid') 
//'nanoid' is a a library which generates a tiny, secure, URL-friendly, unique string ID for JavaScript

const URL = require('../models/urlModel')

async function handleGenerateShortURL(req, res){
    const body = req.body;
    console.log(body.url);  /* 
    // The user sends a request from Postman in JSON format.
    // The user can also send a request from Frontend(ejs) in form-data format.
    // So, we have to support both data formats by using the "middlewares". (Refer app.js)
    // The request body contains JSON data, including a "url" field.

    Example:    {
                "url": "https://www.google.com"
                } 
    */
    if(!body.url) {
        console.log('url is required');
        return res.status(400).json({ error: 'url is required'}); // this response will be shown on postman
    }

    const shortID = nanoid(8);

    // This creates entry in a collection which us associated with URL model in the database;
    await URL.create({
        shortId: shortID,
        originalUrl: body.url,
        visitHistory: [],
        clicks: 0,
        createdBy: req.user._id,
    });

    console.log(`ShortID for above URL is: ${shortID}`)

    return res.redirect('/');

    return res.render("home", {
        id: shortID,
    });  // As we have to render a 'home page' when shortURL is generated. We are also passing shortid which can be accessed by 'home.ejs'
    
    // return res.json({id: shortID}); // this response will be shown on postman and also on UI
}

const handleRedirectUrl = async (req, res)=>{
    const shortId = req.params.shortID;
    // 'entry' variable will store the complete document associated with the above 'shortID'
    const entry = await URL.findOne({shortId: shortId});

    // TO add visit history and to update count we need to use 'URL.findOneAndUpdate() method'
    await URL.findOneAndUpdate(
        {shortId: shortId}, 
        { 
          $push : {visitHistory: {timestamp: Date.now()} },
          $inc: { clicks: 1 }
        },
        // { $set : {clicks: {$size: "$visitHistory"} } } ---> This 'set' can be used with aggregated pipelines
    );
    res.redirect(entry.originalUrl);
}

module.exports = {
    handleGenerateShortURL,
    handleRedirectUrl
}