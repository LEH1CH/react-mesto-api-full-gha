class ConflictError extends Error {
  constructor(message = 'данные уже используются') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
