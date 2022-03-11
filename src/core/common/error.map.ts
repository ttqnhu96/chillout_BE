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
    E003: {
        Code: 'E003',
        Message: `This account has not been registered. Please sign up.`
    },
    E004: {
        Code: 'E004',
        Message: `This account was deactivated.`
    },
    E005: {
        Code: 'E005',
        Message: `Invalid password.`
    },
    E006: {
        Code: 'E006',
        Message: `You do not have permission to access other account information.`
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