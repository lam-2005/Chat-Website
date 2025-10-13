const handleError = (res, err = "Internal Server Error", statusCode = 500) =>
  res.status(statusCode).json({ message: err });

export default handleError;
