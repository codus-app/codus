/**
 * An Error designed for errors that come with an HTTP status code. Instantiate with status code
 * as first argument and message as second.
 */
class HTTPError extends Error {
  constructor(...args) {
    super(...args.slice(1));
    [this.statusCode] = args;
    Error.captureStackTrace(this, HTTPError);
  }

  // Handle the error with an Express response
  handle(res) {
    res.status(this.statusCode).json({ error: this.message });
  }
}

module.exports = HTTPError;
