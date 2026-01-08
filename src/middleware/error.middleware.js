export function errorMiddleware(logger) {
  return (err, req, res, next) => {
    logger.error(
      {
        err: err instanceof Error ? err.stack : err,
        url: req.originalUrl,
        method: req.method,
      },
      'Unhandled error',
    );

    let statusCode = err.status || 500;
    let message = err.message || 'Internal Server Error';


    if (!(err instanceof Error) && !message) {
      message = 'Unknown error';
    }

    return res.status(statusCode).json({
      success: false,
      message,
    });
  };
}
