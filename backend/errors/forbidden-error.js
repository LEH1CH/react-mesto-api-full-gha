class ForbiddenError extends Error {
  constructor(message = 'доступ к запрошенному ресурсу запрещен') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
