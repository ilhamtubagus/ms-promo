import pinoHttp from 'pino-http';

function createHttpLogger(logger) {
  return pinoHttp({
    logger,
    customLogLevel(req, res, err) {
      if (res.statusCode >= 500 || err) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },
  });
}

export default createHttpLogger;
