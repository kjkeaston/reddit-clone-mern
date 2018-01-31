let db = require('../models');

let seedComments = [
{
  content: "BOOOOOO!!!!!",
  votes: 5
},
{
  content: "blah blah blah blah blah",
  votes: 22
},
{
  content: "To be or not to be....that is the question",
  votes: 11
},
{
  content: "Tiger's back!",
  votes: 9
}
]

let seedTextPosts = [
{
  title: "Cool Story, bro.",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  thumbnail_image_url: "http://www.defendersource.com/forum/images/dto_garage/users/5810/1076.jpg",
  votes: 13,
  comments: [ seedComments[3], seedComments[0] ]
},
{
  title: "BLAH",
  content: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
  thumbnail_image_url: "https://2p2bboli8d61fqhjiqzb8p1a-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/bmw-m5-tire-stickers-520x338.jpg",
  votes: 7,
  comments: [ seedComments[1], seedComments[0], seedComments[2] ]
},
{
  title: "Patriots suck",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  thumbnail_image_url: "http://strongauto.net/wp-content/uploads/images/2014-Mercedes-Benz-S-Class_3069.jpg",
  votes: 16,
  comments: [ seedComments[2], seedComments[1], seedComments[3] ]
}
]

db.TextPost.remove({}, function(err, posts){
  // code in here runs after all posts are removed
  db.TextPost.create(seedTextPosts, function(err, posts){
    // code in here runs after all posts are created
    if (err) { return console.log('ERROR', err); }
    console.log("All posts:", posts);
    console.log("created", posts.length, "posts");
    process.exit();
  });
});