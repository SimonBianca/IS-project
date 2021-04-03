export const API_ROUTES = {
    ALL: '/',
    LOGIN_URL: '/auth/login',
    LOGOUT_URL: '/auth/logout',
    CLIENT_CREATE_URL: '/client/create',
    RESOURCE_URL: '/resource',
    SPECIFIC_URL: '/specific',
    PRODUCT_URL: '/Product',
    USER_URL: "/User",
    ORDER_URL: "/Order",
    CLIENT_UPDATE_URL: "/ClientAccount",
    USER_ORDER_URL: "/UserOrder",
    ADMIN_ORDERS_URL: "/AllOrders"

};
export function ApiUrl(path) {
    return `http://localhost:3000${path}`;
}