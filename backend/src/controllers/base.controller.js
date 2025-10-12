class BaseController {
  handleError(res, err, statusCode = 500) {
    res.status(statusCode).json({ message: err });
  }
}
export default BaseController;
