export const APP_ROUTES = {
    LOGIN: {
        url: '/login',
        path: 'login'
    },
    CREATE_ACCOUNT: {
        url: '/create-account',
        path: 'create-account'
    },
    STORE: {
        url: '/store',
        path: 'store',
        PRODUCT: {
            url: storeProductUrl,
            path: 'store/product/:id'
        }
    },
    CART: {
        url: '/cart',
        path: 'cart'
    },
    ACCOUNT: {
        url: '/account',
        path: 'account'
    },
    ADMIN: {
        url: '/admin',
        path: 'admin',
        CREATE_PRODUCT: {
            url: adminCreateProducttUrl,
            path: 'admin/create-product'
        }
    }
}

export function storeProductUrl(productId: string) {
    return APP_ROUTES.STORE.url + "/product/" + productId;
}

export function adminCreateProducttUrl() {
    return APP_ROUTES.ADMIN.url + "/create-product";
}