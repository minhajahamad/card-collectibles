export const API_URL = {
    REGISTER: {
        REGISTER: "/api/register/",
        REFFERAL_REGISTER:code=> `/api/refer/${code}/`
    },
    LOGIN:{
        LOGIN: "/api/login/"
    },
    USER: {
        GET_USER: "/api/users/",
        GET_USER_UUID:uuid=> `/api/user/${uuid}/`,
        PATCH_USER_UUID:uuid=> `/api/user/${uuid}/`

    },
    ADDRESS: {
        GET_ADDRESS: "/api/addresses/",
        POST_ADDRESS: "/api/addresses/",
        PATCH_ADDRESS:uuid=> `/api/addresses/${uuid}/`,
         GET_ADDRESS_UUID:uuid=> `/api/address/${uuid}/`

    },
    SELLERS: {
        GET__SELLERS: "/api/sellers/",
        POST_SELLERS: "/api/sellers/",
        PATCH_SELLERS:id => `/api/sellers/${id}/`,
        CATEGORY: "/api/categories/",
    },
    AFFILIATES: {
        GET_AFFILIATES:uuid => `/api/dashboard/${uuid}`
    }
}