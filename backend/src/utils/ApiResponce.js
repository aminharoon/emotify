class ApiResponse {

    constructor(statusCode, Message, data, success = true) {
        this.statusCode = statusCode
        this.message = Message
        this.data = data
        this.success = success

    }
}

module.exports = ApiResponse;