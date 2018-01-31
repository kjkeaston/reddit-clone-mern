var models = require('../models');
var TextPost = models.TextPost;

// => above lines is same as 
// var db = require('../models');
// var TextPost = db.TextPost;
// => if we removed line 6 then we would say db.TextPost everywhere 

function index(req, res) {
  TextPost.find({}, function(err, textPosts) {
    if(err) {
      res.send(err);
    } else {
      res.json(textPosts);
    }
  });
}

// function create(req, res) {
//   // var comments = req.body.comments.split(', ');
//   // req.body.comments = comments;
//   TextPost.create(req.body, function(err, newPost) {
//     if(err) {
//       console.log("There was an error.", err);
//     }
//     res.json(newPost);
//   });
// }

function create(req, res) {
  console.log(req.body);
  TextPost.create(req.body, function(err, newPost) {
    if(err) {
      res.send(err);
      console.log("error adding post", err);
    } else {
      res.json(newPost);
    }
  });
}

function show(req, res) {
  TextPost.findById(req.params.post_id, function(err, foundPost) {
    if(err) {
      res.send(err);
      console.log("error finding post", err)
    } else {
      res.json(foundPost);
    }
  });
}

function update(req, res) {
  TextPost.findByIdAndUpdate(req.params.post_id, 
    {$set: req.body}, {"new": true}, function(err, updatedPost) {
    if(err) {
      res.send(err);
      console.log("error updating post", err);
    } else {
      res.json(updatedPost);
    }
  });
}

function destroy(req, res) {
  TextPost.findByIdAndRemove(req.params.post_id, function(err, deletedPost) {
    if(err) {
      res.send(err);
      console.log("Delete error occurred", err);
    } else {
      res.send(200, `post with ID: ${req.params.post_id} was deleted!`);
    }
  });
}

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;

// => above is same as 
// module.exports = {
//   index: index,
//   create: create,
//   show: show,
//   destroy: destroy,
//   update: update
// }
