const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not found",
  409: "Conflict",
  500: "Internal Server Error",
};

const createError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createError;
