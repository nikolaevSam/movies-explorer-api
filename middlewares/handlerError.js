const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('../utils/constants');

const handlerError = ((error, req, res, next) => {
  const {
    status = HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message,
  } = error;
  res.status(status).send({
    message: status === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message,
  });
  next();
});

module.exports = handlerError;
