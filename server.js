const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

const { mongoose } = require('./db/connect');
console.log(mongoose);
//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/cycling', require('./routes/routes'))

app.listen(port , ()=>{
    console.log(`Se está escuchando en el puerto http://localhost:${port}`)
});
