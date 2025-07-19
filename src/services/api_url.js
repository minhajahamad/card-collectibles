export const API_URL = {
    REGISTER: {
        REGISTER: "/api/register/",
        REFFERAL_REGISTER:code=> `/api/refer/${code}/`
    },
    USER: {
        GET_USER: "/api/users/",
        GET_USER_UUID:uuid=> `/api/user/${uuid}/`
    },
    ADDRESS: {
        GET_ADDRESS: "/api/addresses/",
        POST_ADDRESS: "/api/addresses/"
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