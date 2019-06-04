// import express
const express = require('express');

// link to posts content
const Banana = require('./seeds/01-posts');

// create express router
const router = express.Router();


// GET posts
router.get('/', async (req, res) => {
    try{
        const banana = await Banana.find(req.query);
        res.status(200).json(banana)
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        });
    }
});

module.exports = router;