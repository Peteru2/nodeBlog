const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
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


app.get('/about', (req,res)=>{
    res.render('about', {title: "About"})
})
//blogs
app.use('/blogs', blogRoutes)

app.use((req, res)=>{
    res.status(404).render('404', {title: "404"})
})