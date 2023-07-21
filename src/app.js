const express = require('express');
const app = express();
const products = require('./routes/productosRoutes');


// configuraciones app.use()
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//Rutas
app.use('/products', products);




app.listen(3000,() => console.log('server corriendo en el puerto http://localhost:3000'));