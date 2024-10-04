
import express from 'express'
const port = process.env.PORT || 8000;

const app = express();


let posts = [
  { id: 1, title: 'Post One', body: 'This is post one' },
  { id: 2, title: 'Post Two', body: 'This is post two' },
  { id: 3, title: 'Post Three', body: 'This is post three' },
];

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({msg : 'hello'})
})

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

export default app