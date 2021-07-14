function errorMiddleWare (error, req, res, next) {
    let {status = 500, message, data} = error;

    console.log(`[Error] ${error}`);

    message = status === 500 || !message ? 'Internal server error' : message;

    error = {
        type: "error",
        status, 
        message,
        ...(data) && data // Learn about this
    }

    res.status(status).send(error);
}

module.exports = errorMiddleWare;