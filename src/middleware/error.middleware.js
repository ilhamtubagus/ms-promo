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

    if (err && err.error && err.error.details) {
      statusCode = 400;
      message = err.error.details.map(d => d.message).join(', ');
    }

    if (err && err.name === 'ValidationError') {
      statusCode = 400;
      message = Object.values(err.errors).map(e => e.message).join(', ');
    }

    if (!(err instanceof Error) && !message) {
      message = 'Unknown error';
    }

    return res.status(statusCode).json({
      success: false,
      message,
    });
  };
}
