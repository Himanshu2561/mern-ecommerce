// Custom error handler for any routes which is not present
const notFound = (req, res, next) => {
    const error = new Error(`Api Route Not Found = ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  // Custom error handler for any errors other than above.
  // Express autometically understands this is our custom error handler
  // because we are passing error as a first argument in the errorHandler function below.
  const errorHandler = (err, req, res, next) => {
    // Manual error might be 200.
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
  
    // Checking a specific mongoose error i.e. CastError that occurs when a user with objectId that does not exist.
    if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 404;
      message = "Resourse Not Found";
    }
  
    // If we are in development we also want stack error, which shows line number, files and so on.
    res.status(statusCode).json({
      message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  };
  
  export { notFound, errorHandler };
  