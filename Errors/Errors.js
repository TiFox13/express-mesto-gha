class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 404;
  }
}

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = 400;
  }
}

// эта штука перенесена в мидлвер
class InternalServerError extends Error {
  constructor() {
    super();
    this.message = 'На сервере произошла ошибка';
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = 401;
  }
}

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = 409;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = 403;
  }
}
module.exports = {
  ValidationError,
  CastError,
  Unauthorized,
  Conflict,
  InternalServerError,
  Forbidden,
};
