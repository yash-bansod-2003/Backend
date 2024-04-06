const CustomErrorHandler = require("../services/custom-error-handler");
const { ValidationError } = require("joi");

const errorHandler = (error, req, res, next) => {
  let status = 500;

  let data = {
    message: "internal server error",
    ...(process.env.NODE_ENV === "development" && {
      orignalMessage: error.message,
    }),
  };

  if (error instanceof CustomErrorHandler) {
    status = error.status;
    data = {
      message: error.message,
    };
  }

  if (error instanceof ValidationError) {
    status = 401;
    data = {
      message: error.message,
    };
  }

  res.status(status).json(data);
};

module.exports = errorHandler;
