const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog'    )
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

app.get('/', (req,res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', {title: "Home", blogs})
})

app.get('/add-blog', (req,res)=>{
   const blog = new Blog({
    title: 'New Blog',
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


app.use((req, res)=>{
    res.status(404).render('404', {title: "404"})
})