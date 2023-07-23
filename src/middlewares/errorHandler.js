const fs = require('fs');
const path = require('path');
// Centralized error handling middleware
function convertHoraArgentina(horaUtc) {
  const options = {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return new Date(horaUtc).toLocaleString('es-AR', options);
}
const errorHandler = (err, req, res, next) => {
    console.error(err.status,err.message);   
    const status = err.status || 500;
    const message = err.message || 'Algo salio Mal';
  
    res.status(status).json({
      status: 'error',
      statusCode: status,
      message: message,
    });

  // Obtener la fecha y hora actual
  const horaUtc = new Date().toISOString();
  const horaArgentina = convertHoraArgentina(horaUtc);
  // Obtener la fecha y hora actual
  const logEntry = `[${horaArgentina}] ${status} ${message}\n ${err}\n\n`;
  // Definir la ruta del archivo de registro
  const logFilePath = path.resolve(__dirname, '../logs/errorsLogs.txt');

  // Escribir la entrada de registro en el archivo de registro 
  fs.appendFile(logFilePath, logEntry, (err) => {
     next();
  });
  };

  module.exports = errorHandler;