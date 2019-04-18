/**
 * An Error designed for errors that come with an HTTP status code. Instantiate with status code
 * as first argument and message as second.
 */
class HTTPError extends Error {
  constructor(...args) {
    // Pass a status code as first argument
    if (typeof args[0] === 'number') {
      super(...args.slice(1));
      [this.statusCode] = args;
    // Or fall back to 500
    } else {
      super(...args);
      this.statusCode = 500;
    }
    Error.captureStackTrace(this, HTTPError);
  }

  // Handle the error with an Express response
  handle(res) {
    res.status(this.statusCode).json({ error: this.message });
  }
}

module.exports = HTTPError;
