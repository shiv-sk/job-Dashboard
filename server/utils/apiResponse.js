class ApiResponse {
    constructor(statusCode , message , data , status = "success"){
        this.statusCode = statusCode
        this.message = message 
        this.data = data
        this.status = status
    }
}

module.exports = ApiResponse;