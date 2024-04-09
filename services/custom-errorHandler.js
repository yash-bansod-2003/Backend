class CustomErrorHandler extends Error {
    constructor(message, status, additionalInfo) {
        super(message);
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo;
    }

    static serverError(
        message = 'internal server error',
        status = 500,
        additionalInfo,
    ) {
        return new CustomErrorHandler(message, status, additionalInfo);
    }

    static notFound(message = 'not found', status = 404, additionalInfo) {
        return new CustomErrorHandler(message, status, additionalInfo);
    }

    static conflict(message = 'conflict', status = 409, additionalInfo) {
        return new CustomErrorHandler(message, status, additionalInfo);
    }

    static wrongCredentials(
        message = 'wrong credentials',
        status = 401,
        additionalInfo,
    ) {
        return new CustomErrorHandler(message, status, additionalInfo);
    }

    static unauthorize(message = 'unauthorize', status = 401, additionalInfo) {
        return new CustomErrorHandler(message, status, additionalInfo);
    }

    static serviceUnavailable(
        message = 'service unavailable',
        status = 503,
        additionalInfo,
    ) {
        return new CustomErrorHandler(message, status, additionalInfo);
    }
}

module.exports = { CustomErrorHandler };
