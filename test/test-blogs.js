const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Blog = require('../models/blog');

const sampleBlog =     {
    "title": "Super Good Blog",
    "description": "A great blog on my SPD."
}

chai.use(chaiHttp);

describe('Blogs', ()  => {

  after(() => {
    Blog.deleteMany({title: 'Super Sweet Blog'}).exec((err, blogs) => {
      console.log(blogs)
      blogs.remove();
    })
  });

  // TEST INDEX
  it('should index ALL blogs on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });

  // TEST CREATE
  it('should create a SINGLE blog on /blogs POST', (done) => {
  chai.request(server)
      .post('/blogs')
      .send(sampleBlog)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
  });

  // TEST SHOW
  it('should show a SINGLE blog on /blogs/<id> GET', (done) => {
  var blog = new Blog(sampleBlog);
  blog.save((err, data) => {
    chai.request(server)
      .get(`/blogs/${data._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
        });
     });
  });

  // TEST EDIT
  it('should edit a SINGLE blog on /blogs/<id>/edit GET', (done) => {
    var blog = new Blog(sampleBlog);
     blog.save((err, data) => {
       chai.request(server)
         .get(`/blogs/${data._id}/edit`)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.html
           done();
         });
     });
    });

  // TEST UPDATE
  it('should update a SINGLE blog on /blogs/<id> PUT', (done) => {
  var blog = new Blog(sampleBlog);
  blog.save((err, data)  => {
   chai.request(server)
    .put(`/blogs/${data._id}?_method=PUT`)
    .send({'title': 'Updating the title'})
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.html
      done();
        });
    });
  });

  // TEST DELETE
  it('should delete a SINGLE blog on /blogs/<id> DELETE', (done) => {
    var blog = new Blog(sampleBlog);
    blog.save((err, data)  => {
     chai.request(server)
      .delete(`/blogs/${data._id}?_method=DELETE`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html
        done();
      });
    });
  });


});
