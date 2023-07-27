class NotFoundError extends Error {
  constructor(message = 'запрошенный ресурс не найден') {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
