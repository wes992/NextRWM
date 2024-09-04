const HTTPCode = {
  CONFLICT: 409,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  OKAY: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

const DBErrors = {
  EMPTY_RESULT: "DBEmptyResultError",
  DB_ERROR: "DBDatabaseError",
  CONFLICT: "DBUniqueConstraintError",
  FOREIGN_KEY_CONSTRAINT: "DBForeignKeyConstraintError",
  UNAUTHORIZED: "DBUnathorized",
};

const errCodeMapping = {
  11000: DBErrors.CONFLICT,
  401: DBErrors.UNAUTHORIZED,
};

const errors = {
  [DBErrors.EMPTY_RESULT]: {
    status: HTTPCode.NOT_FOUND,
    errors: "Not Found",
    message: "The record you provided does not exist",
  },
  [DBErrors.DB_ERROR]: {
    status: HTTPCode.INTERNAL_SERVER_ERROR,
    errors: "Internal Server Error",
    message:
      "There was an issue communicating with background services. Please try again later",
  },
  [DBErrors.CONFLICT]: {
    status: HTTPCode.CONFLICT,
    errors: "Conflict",
    message: "Conflict. The record already exists",
  },
  [DBErrors.FOREIGN_KEY_CONSTRAINT]: {
    status: HTTPCode.BAD_REQUEST,
    errors: "Bad Request",
    message:
      "There was an issue with your request. Please ensure the payload is valid.",
  },
  [DBErrors.UNAUTHORIZED]: {
    status: HTTPCode.UNAUTHORIZED,
    errors: "Not Authorized",
    message: "You need to login to do that...",
  },
};

const getErrorMessage = (errCode) => {
  // const errorName = errmsg.split(":")[0];
  return (
    errors[errCode] ||
    errors[errCodeMapping[errCode]] ||
    errors[DBErrors.DB_ERROR]
  );
};

module.exports = {
  HTTPCode,
  DBErrors,
  errors,
  getErrorMessage,
};
