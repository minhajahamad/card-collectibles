export const API_URL = {
    REGISTER: {
        REGISTER: "/api/register/",
        REFFERAL_REGISTER:code=> `/api/refer/${code}/`
    },
    LOGIN:{
        LOGIN: "/api/login/"
    },
    VALIDATION: {
        EMAIL: "/api/check-user/",
        PHONE_NUMBER: "/api/check-user/"
    },
    USER: {
        GET_USER: "/api/users/",
        GET_USER_UUID:uuid=> `/api/user/${uuid}/`,
        PATCH_USER_UUID:uuid=> `/api/user/update/${uuid}/`

    },

    EMAIL_LOGIN:{
      POST_EMAIL:"/api/send-verification/",
            GET_EMAIL_VERIFIED:"/api/verify-email/"

    },

    CATEGORY: {
        GET_CATEGORY: "/api/categories/",
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
        PATCH_SELLERS:uuid => `/api/seller/update/${uuid}/`,
        CATEGORY: "/api/categories/",
    },
    AFFILIATES: {
        GET_AFFILIATES:uuid => `/api/dashboard/${uuid}`
    }
}