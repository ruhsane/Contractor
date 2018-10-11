module.exports = function (app, Blog) {

  app.get('/', (req, res) => {
    Blog.find()
      .then(blogs => {
        res.render('blogs-index', {blogs: blogs});
      })
      .catch(err => {
        console.log(err);
      });
  });

}
