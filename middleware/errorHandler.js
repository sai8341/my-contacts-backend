const constants = require("../constants");

const errorHandler = (error, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;

    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        response.json({
          title: "Validation Failed",
          message: error.message,
          stackTrack: error.stack,
        });
        break;

      case constants.NOT_FOUND:
        response.json({
          title: "Not Found",
          message: error.message,
          stackTrack: error.stack,
        });
        break;

    case constants.UNAUTHORIZED:
        response.json({
            title: "Un authorized",
            message: error.message,
            stackTrake: error.stack
        })
        break;

    case constants.FORBIDDEN:
        response.json({
            title: "Forbidden",
            message: error.message,
            stackTrack: error.stack
        })
        break;

    case constants.SERVER_ERROR:
        response.json({
            title: "Server Error",
            message: error.message,
            stackTrack: error.stack
        })
        
    default:
        console.log("No Error All Good")
        break;
    }
}

module.exports = errorHandler;