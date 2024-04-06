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

    static alreadyExists(
        message = 'already exists',
        status = 401,
        additionalInfo,
    ) {
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

    static connectionError(
        message = 'cannot connect to database',
        status = 404,
        additionalInfo,
    ) {
        return new CustomErrorHandler(message, status, additionalInfo);
    }
}

module.exports = CustomErrorHandler;
