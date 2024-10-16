import express from 'express'
import router from './router';
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth';
import { createNewUer, signin } from './handlers/user';


const app = express();

app.use(cors()) // middleware for cors
app.use(morgan('dev')) // middleware for logging
app.use(express.json()) // middleware for parsing json
// app.use(express.urlencoded({extended: true})) // middleware for parsing urlencoded




app.get('/', (req, res) => {
  res.status(200)
  res.json({msg : 'hello'})
})


app.use('/api', protect, router)  // http://localhost:3001/api


app.post('/user', createNewUer)
app.post('/signin', signin)


app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401)
    res.json({msg: 'unauthorized'})
  }
  else if (err.type === 'input') {
    res.status(400)
    res.json({msg: 'bad request'})
  }
  else {
    res.status(500)
    res.json({msg: 'internal server error'})
  }
})




export default app