// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
  
    const status = err.status || 500;
    const message = err.message || 'Algo salio Mal';
  
    res.status(status).json({
      status: 'error',
      statusCode: status,
      message: message,
    });
  };

  module.exports = errorHandler;