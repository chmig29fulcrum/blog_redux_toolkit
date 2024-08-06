class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message); // calling constructor of Error class
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // only errors marked with isOperational will send text to client, all unexpected errors will send just 500

    Error.captureStackTrace(this, this.constructor); // to get the stack trace
  }
}

export default AppError;

/*
class AppError extends Error {
  statusCode: number;
  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
  }
}
*/
