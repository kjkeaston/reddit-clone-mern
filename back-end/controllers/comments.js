var models = require('../models');
var Comment = models.Comment;
var TextPost = models.TextPost;

// router.post('/api/posts/:post_id/comments', commentsController.create);
// => /api/posts/5/comments => POST
// 1. Create a new comment
// 2. Find Post #5
// 3. Push that new comment to Post's #5 comments array
function create(req, res) {
  Comment.create(req.body, function(err, createdComment) {
    if (err) {
      console.log("error adding comment", err);
    } else {
      TextPost.findById(req.params.post_id, function(err, foundPost) {
        if (err) {
          console.log("error finding post to edit comment", err);
        } else {
          post.comments.push(createdComment);
          post.save();
          res.json(createdComment);
        }
      });
    }
  }); 
}

// router.put('/api/posts/:post_id/comments/:comment_id', commentsController.update);
// => /api/posts/5/comments/7 => PUT
// 1. Find Comment #7 and update it
// 2. Find Post #5
// 3. Update comment in post #5's comment array
function update(req, res) {
  Comment.findOneAndUpdate(req.params.comment_id, 
    {$set: req.body}, {"new": true}, function(commentErr, updatedComment) {
    if (commentErr) {
      res.send(commentErr);
      console.log("error updating", commentErr);
    } else {
      // find the post the comment belongs to
      TextPost.findById(req.params.post_id, function(postErr, parentPost) {
        if (postErr) {
          res.send(postErr);
          console.log ("error finding post", postErr);
        }
        // update the comment in the TextPost's comments array as well
        let commentToUpdate = post.comments.id(req.params.comment_id);
        commentToUpdate.content = updatedComment.content;
        commentToUpdate.votes = updatedComment.votes;

        post.save(function() {
          res.json(updatedComment);
        });
      });
    }
  });
}
// router.put('/api/posts/:post_id/comments/:comment_id', commentsController.update);
// => /api/posts/5/comments/7 => DELETE
// 1. Find Comment #7 and remove 
// 2. Find TextPost it belongs to and remove it from its comments array
function destroy(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(commentErr) {
    if (commentErr) {
      console.log("error with comment delete", commentErr);
    } else {
      TextPost.findByIdAndUpdate(req.params.post_id, {$pull: {comments: { _id: req.params.comment_id } } }, function(postErr) {
        if (postErr) {
          console.log("error with post's comment delete", postErr);
        }
        res.send("comment deleted!");
      });
    }
  });
}

module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;