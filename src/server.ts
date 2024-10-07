import express from 'express'
import router from './router';
import morgan from 'morgan'
import cors from 'cors'

const app = express();

app.use(cors()) // middleware for cors
app.use(morgan('dev')) // middleware for logging
app.use(express.json()) // middleware for parsing json
app.use(express.urlencoded({extended: true})) // middleware for parsing urlencoded





app.get('/', (req, res) => {
  res.status(200)
  res.json({msg : 'hello'})
})

app.use('/api', router)  // http://localhost:3000/api




export default app