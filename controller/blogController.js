//blog_index, blog_createPost, blog_createGet, blog_delete, blog_details
const Blog = require('../models/blog')

const blog_index = (req, res) =>{
    Blog.find().sort({createdAt: -1})
    .then((result) =>{
        res.render('index', {title: "All blogs", blogs: result })
    })

}
const blog_createGet = (req, res) =>{
    res.render('create', {title: "Create"})
}

const blog_createPost = (req, res) =>{
    const blog = new Blog(req.body)
    blog.save()
        .then((result) =>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err)
        })
}

const blog_details = (req, res) =>{
    const id = req.params.id
    Blog.findById(id)
        .then((result) =>{
            res.render('details', {title: "Blog details", blog: result })
        })
        .catch((err) =>{
            console.log(err)
        })
}

const blog_delete = (req, res) =>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) =>{
            res.json({redirect: "/blogs"})
        })
        .catch((err) =>{
            console.log(err)
        })
}


module.exports = {
    blog_index,
    blog_createPost,
    blog_createGet,
    blog_details,
    blog_delete

}
