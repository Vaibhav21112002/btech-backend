export const SUCCESS = (message, data = {}) => {
    return {
        status : 200,
        success : true,
        message : message,
        data : data
    }
}

export const ERROR = (message) => {
    return {
        status : 400,
        success : false,
        message : message
    }
}

export const NOT_FOUND = (message) => {
    return {
        status : 404,
        success : false,
        message : message
    }
}

export const CUSTOM_ERROR_RESPONSE = (status, message) => {
    return {
        status : status,
        success : false,
        message : message
    }
}

export const UNAUTHORIZED = () => {
    return {
        status : 401,
        success : false,
        message : "Unauthorized"
    }
}
