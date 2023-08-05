console.clear();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/index.js');
const {erroresHandler} = require('./middlewares/errorHandler.js');
const {reqLogMiddleware} = require('./middlewares/reqLog.js');
const path = require('path');
const connectToDb  = require('./database/config/mongo');
const PORT=process.env.PORT || 3000;

//Conexion a la base
connectToDb();

// configuraciones app.use()
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//meddleware de logs de req
app.use(reqLogMiddleware);

//Rutas auto cargadas en Routes/Index.js
app.use('/api/1.0',routes);

//middleware de errores
app.use(erroresHandler);


app.listen(PORT,() => console.log(`server corriendo en el puerto http://localhost:${PORT}`));