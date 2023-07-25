console.clear();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT=process.env.PORT || 3000;
const routes = require('./routes/index.js');
const {erroresHandler} = require('./middlewares/errorHandler.js');
const {reqLogMiddleware} = require('./middlewares/reqLog.js');
const path = require('path');




// configuraciones app.use()
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//meddleware de logs de req
app.use(reqLogMiddleware);
app.use('/public/images', express.static(path.join(__dirname,'../public/images')));


//Rutas auto cargadas en Routes/Index.js
app.use('/api/1.0',routes);

//middleware de errores
app.use(erroresHandler);


app.listen(PORT,() => console.log(`server corriendo en el puerto http://localhost:${PORT}`));