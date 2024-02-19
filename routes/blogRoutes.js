const express = require('express')
const router = express.Router();
const Blog = require('../models/blog')


router.get('/blog/create', (req,res)=>{
    res.render('create', {title: "Create"})
})

router.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result) =>{
            res.render('index', {title: "All blogs", blogs: result })
        })
    
})
router.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body)
    blog.save()
        .then((result) =>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err)
        })
})

router.get('/blogs/:id', (req, res) =>{
    const id = req.params.id
    Blog.findById(id)
        .then((result) =>{
            res.render('details', {title: "Blog details", blog: result })
        })
        .catch((err) =>{
            console.log(err)
        })
})
router.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({redirect: "/blogs"})
        })
        .catch((err) =>{
            console.log(err)
        })
})

module.exports = router;