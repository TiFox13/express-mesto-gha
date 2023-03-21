class InternalServerError extends Error {
  constructor() {
    super();
    this.message = 'На сервере произошла ошибка';
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

module.exports = { InternalServerError };
