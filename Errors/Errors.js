class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 404;
  }
}

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = "CastError";
    this.statusCode = 400;
  }
}


class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}


class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = 401;
  }
}

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = "Conflict";
    this.statusCode = 409;
  }
}

module.exports = {
  ValidationError,
  CastError,
  InternalServerError,
  Unauthorized,
  Conflict,
}