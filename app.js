const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/contractor');



const Comment = require('./models/comment')

const Blog = require("./models/blog")

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');

app.use(express.static('./public'))

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




// INDEX
app.get('/', (req, res) => {
  Blog.find()
    .then(blogs => {
      res.render('blogs-index', { blogs: blogs });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW
app.get('/blogs/new', (req, res) => {
  res.render('blogs-new', {});
})

// CREATE
app.post('/blogs', (req, res) => {
  Blog.create(req.body).then((blog) => {
    console.log(blog)
    res.redirect(`/blogs/${blog._id}`) // Redirect to blogs/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// SHOW
app.get('/blogs/:id', (req, res) => {
  // find blog
  Blog.findById(req.params.id).then(blog => {
    // fetch its comments
    Comment.find({ blogId: req.params.id }).then(comments => {
      // respond with the template with both values
      res.render('blogs-show', { blog: blog, comments: comments })
    })
  }).catch((err) => {
    // catch errors
    console.log(err.message)
  });
});

// EDIT
app.get('/blogs/:id/edit', function (req, res) {
  Blog.findById(req.params.id, function(err, blog) {
    res.render('blogs-edit', {blog: blog});
  })
})

// UPDATE
app.put('/blogs/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(blog => {
      res.redirect(`/blogs/${blog._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/blogs/:id', function (req, res) {
  console.log("DELETE blog")
  Blog.findByIdAndRemove(req.params.id).then((blog) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

var blogRoutes = require('./controllers/blogs');
var commentRoutes = require('./controllers/comments');

blogRoutes(app, Blog);
commentRoutes(app, Comment);


app.listen(port);

module.exports = app;
