export const API_URL = {
    REGISTER: {
        REGISTER: "/api/register/"
    },
    USER: {
        GET_USER: "/api/users/",
        GET_USER_UUID:uuid=> `/api/user/${uuid}/`
    },
    ADDRESS: {
        GET_ADDRESS: "/api/addresses/",
        POST_ADDRESS: "/api/addresses/"
    }
}