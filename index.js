const db=require('./db');
const cors=require('cors')


const express = require('express')
db();
const app = express()
const port = 5000
app.use(cors());
app.use(express.json());

app.options('*', cors());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/login', require('./Routes/auth')
)
app.use('/api/notes', require('./Routes/notes')
)

app.listen(port, () => {
  console.log(`SherNotebook app listening on port ${port}`)
})