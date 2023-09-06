const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOG: 'blog',
    CONTACT: 'contact',
    FAQ: 'faqs',
    DETAIL_PRODUCT__PID__TITLE: 'product/:pid/:title',
    DETAIL_PRODUCT: 'product',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',



    //Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    CREATE_PRODUCT: "create-product",
    MANAGE_PRODUCTS: 'manage-product',
    MANAGE_ORDER: "manage-order",
    MANAGE_USER: "manage-user",
    CREATE_CATEGORY: "create-category",
    MANAGE_CATEGORY: "manage-category",
    CREATE_BRAND: "create-brand",
    MANAGE_BRAND: "manage-brand",



    //Menber
    MEMBER: "menber",
    PERSONAL: "personal",
    MY_CART: "my-cart",
    HISTORY: "buy-history",
    WISHLIST: "wishlist"



}


export default path