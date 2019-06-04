// import express
const express = require('express');

// link to file that has find, findById, delete, create, etc.
const db = require('../data/db');

// create express router
const router = express.Router();


// GET posts
router.get('/', async (req, res) => {
    try {
        const posts = await db.find(req.query);
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "The posts information could not be retrieved."
        });
    }
});

// GET post with specific ID
router.get('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id);

        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({
            message: "The post information could not be retrieved."
        })
    }
})

// POST insert a new post

router.post('/', async (req, res) => {
    try {
      const post = await db.insert(req.body);
      res.status(201).json(post)
    } catch (error) {
       releaseEvents.status(500).json({
           message:  "Please provide title and contents for the post."
       })
    }
})

// REMOVE a post
router.delete('/:id', async (req, res) => {
    try {
        const count = await db.remove(req.params.id);
        if(count > 0){
            res.status(200).json({ message: "The post has been deleted" });
        } else {
            res.status(404).json({ mesage: "The post with the specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({
            message: "The post could not be removed"
        })
    }
})

// UPDATE a post
router.put('/:id', async (req, res) => {
    try {
        const post = await db.update(req.params.id, req.body);
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    } catch (error ) {
        res.status(500).json ({
            message: "The post information could not be modified."
        })
    }   
})


// FIND POST COMMENTS  by id
router.get('/:id/comments', async (req, res) => {
    const id = req.params.id;

    try {
        const messages = await db.findPostComments(id);
        if (messages.length) {
            res.json(messages)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    } catch (err) {
        res.status(500).json({errorMessage: "Please provide text for the comment." })
    }
})

// POST new message with specific ID

router.post('/:id/comments', async (req, res) => {
    const messageInfo = {...req.body, post_id: req.params.id}

    try {
        const saved = await db.insertComment(messageInfo)
        res.status(201).json(saved)
    } catch (err) {
         res.status(500).json({
             message: "Please provide text for the comment.",
             err
         });
    }
});



module.exports = router;