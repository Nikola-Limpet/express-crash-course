const { Console } = require('console');
const express = require('express');
const path = require('path'); 
const port = process.env.PORT || 8000;

const app = express();

// setup static folder 

// middle ware is just a function that run between in comming req and outgoing res
// app.use(express.static(path.join(__dirname, 'public')))

let posts = [
  { id: 1, title: 'Post One', body: 'This is post one' },
  { id: 2, title: 'Post Two', body: 'This is post two' },
  { id: 3, title: 'Post Three', body: 'This is post three' },
];

// get all posts
app.get('/api/posts', (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    res.json(posts.slice(0, limit));
  } else {
    res.json(posts);
  }
});

// get single post
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id == id);

  if (!post) {
    res.status(404).json({msg : `A post with the if of ${id} was not found `});
  } else {
    res.status(202).json(post);
  }
});

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

app.listen(port, () => console.log(`server is running on port ${port}`));