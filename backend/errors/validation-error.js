class ValidationError extends Error {
  constructor(message = 'переданы некорректные данные') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
