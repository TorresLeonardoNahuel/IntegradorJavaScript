const fs = require('fs');
const path = require('path');
const {convertHoraArgentina} =require('../middlewares/reqLog.js')


const erroresHandler = (err, req, res, next) => {
    console.error(err.status,err.message);   
    const status = err.status || 500;
    const message = err.message || 'Algo salio Mal';
  
    res.status(status).json({
      status: 'error',
      statusCode: status,
      message: message,
    });

    //mismo metodo que reqlog.js
  const horaUtc = new Date().toISOString();
  const horaArgentina = convertHoraArgentina(horaUtc);
  const logEntry = `[${horaArgentina}] ${status} ${message}\n ${err}\n\n`;
  const logFilePath = path.resolve(__dirname, '../logs/errorsLogs.txt');
  fs.appendFile(logFilePath, logEntry, (err) => {
     next();
  });
  };

  module.exports = {erroresHandler};