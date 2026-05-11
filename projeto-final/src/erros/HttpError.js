module.exports = class HttpError extends error {
    constructor(status, message) {
        super(message)
        this.status = status
    }
}