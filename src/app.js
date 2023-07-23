console.clear();
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT=process.env.PORT || 3000;
const routes = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler.js');
const reqLogMiddleware = require('./middlewares/reqLog.js');



// configuraciones app.use()
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(reqLogMiddleware);


//Rutas auto cargadas en Routes/Index.js
app.use('/api/1.0',routes);
app.use('*', (req, res, next)=>{
    const error = new Error(
        'Pagina no encontrada'
    );
    error.status = 404;
    next(error);}
);

app.use(reqLogMiddleware);
app.use(errorHandler);


app.listen(PORT,() => console.log(`server corriendo en el puerto http://localhost:${PORT}`));