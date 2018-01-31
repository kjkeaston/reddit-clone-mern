// lets you store settings in your .env file to tell what port to use
require('dotenv').config();

// requiring express
var express = require('express');

// creating express app
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var redditRouter = require('./config/routes.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.use(redditRouter);
// app.use(require('./config/routes.js'));

// => if I wanted to do what we have done in the past, I would comment out redditRouter and change 'router' to 'app' and add all routes in routes.js to this file
// app.get('/api/posts', textPostsController.index);
// app.post('/api/posts', textPostsController.create);
// app.get('/api/posts/:post_id', textPostsController.show);
// app.put('/api/posts/:post_id', textPostsController.update);
// app.delete('/api/posts/:post_id', textPostsController.destroy);


let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Listening on port ${ port }`);
  console.log("Listening to reddit clone");
});
