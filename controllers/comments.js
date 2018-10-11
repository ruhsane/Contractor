module.exports = (app, Comment) => {

    app.post('/blogs/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        res.redirect(`/blogs/${comment.blogId}`);
      }).catch((err) => {
        console.log(err.message);
        });
    });

    // DELETE
    app.delete('/blogs/comments/:id', function (req, res) {
      console.log("DELETE comment")
      Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/blogs/${comment.blogId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
}
