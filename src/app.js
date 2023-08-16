console.clear();
require('dotenv').config();
const engine = require('ejs-mate');
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

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// app.set('views',(path.resolve(__dirname, '../public/views')));
// app.engine('ejs', engine);
// app.set('view engine', 'ejs');

// configuraciones app.use()

//meddleware de logs de req
app.use(reqLogMiddleware);

//Rutas auto cargadas en Routes/Index.js
app.use('/api/1.0',routes);

//middleware de errores
app.use(erroresHandler);


app.listen(PORT,() => console.log(`server corriendo en el puerto http://localhost:${PORT}`));