/**
 * An Error designed for errors that come with an HTTP status code. Instantiate with status code
 * as first argument and message as second.
 */
class HTTPError extends Error {
  /* eslint-disable no-param-reassign */
  constructor(statusCode, rawMessage, ...args) {
    // If no status code was passed, message was first argument, and statusCode should fallback to
    // default 500
    if (typeof statusCode !== 'number' || !rawMessage) {
      rawMessage = statusCode;
      statusCode = 500;
    }

    super(rawMessage.toString(), ...args);
    Object.assign(this, { rawMessage, statusCode });
    Error.captureStackTrace(this, HTTPError);
  }

  // Handle the error with an Express response
  handle(res) {
    res.status(this.statusCode).json({ error: this.rawMessage });
  }
}

module.exports = HTTPError;
