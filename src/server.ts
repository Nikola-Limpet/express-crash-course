
import express from 'express'
const port = process.env.PORT || 8000;

const app = express();


app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({msg : 'hello'})
})


export default app