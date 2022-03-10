export const ErrorMap = {
    SUCCESSFUL: {
        Code: 'SUCCESSFUL',
        Message: 'Successfully!'
    },
    E001: {
        Code: 'E001',
        Message: `A user with this username already exists. Please log in.`
    },
    E002: {
        Code: 'E002',
        Message: `User does not exist.`
    },

    E400: {
        Code: 'E400',
        Message: `Bad request`
    },
    E403: {
        Code: 'E401',
        Message: `Unauthorized`
    },
    E500: {
        Code: 'E500',
        Message: `Server error`
    }
}