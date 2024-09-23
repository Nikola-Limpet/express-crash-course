const express = require('express');

const path = require('path'); 

const app = express();

// setup static folder 

// middle ware is just a function that run between in comming req and outgoing res
app.use(express.static(path.join(__dirname, 'public')))


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'about.html'));
// }
// )



app.listen(8000, () => console.log(`server is running on port 8000`));
