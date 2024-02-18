const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const uri = "mongodb+srv://devpeter:Mag1@cluster0.to9arvf.mongodb.net/devpeter?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then((result) =>{
        app.listen(3000)
        console.log("Connected")
    })
    .catch((err) =>{
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(morgan('dev'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.redirect('blogs')
})

app.get('/add-blog', (req,res)=>{
   const blog = new Blog({
    title: 'New Blog 2',
    snippet: "It is done",
    body: "Yeah it is done",
   })

   blog.save()
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        })
})

app.get('/about', (req,res)=>{
    res.render('about', {title: "About"})
})
app.get('/blog/create', (req,res)=>{
    res.render('create', {title: "Create"})
})
app.get('/blogs', (req, res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result) =>{
            res.render('index', {title: "All blogs", blogs: result })
        })
    
})
app.post('/blogs', (req, res) =>{
    const blog = new Blog(req.body)
    blog.save()
        .then((result) =>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) =>{
    const id = req.params.id
    Blog.findById(id)
        .then((result) =>{
            res.render('details', {title: "Blog details", blog: result })
        })
        .catch((err) =>{
            console.log(err)
        })
})
app.delete('/blogs/:id', (req, res) =>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) =>{

        })
        .catch((err) =>{
            console.log(err)
        })
})
app.use((req, res)=>{
    res.status(404).render('404', {title: "404"})
})