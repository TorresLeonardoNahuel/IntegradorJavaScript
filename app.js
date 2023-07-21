require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT=process.env.PORT || 3000;
const routes = require('./src/routes/index.js');


// configuraciones app.use()
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//Rutas
app.use('/api/1.0',routes);




app.listen(PORT,() => console.log('server corriendo en el puerto http://localhost:',PORT));