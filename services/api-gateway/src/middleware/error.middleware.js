const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.response?.status || err.status || 500;
  const message = err.response?.data?.error || err.message || 'Internal server error';

  if (status >= 500) {
    console.error('Gateway error:', err.message);
  }

  res.status(status).json({ error: message });
};

export default errorMiddleware;
