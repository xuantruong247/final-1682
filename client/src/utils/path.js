const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: 'products',
    BLOG: 'blog',
    CONTACT: 'contact',
    FAQ: 'faqs',
    DETAIL_PRODUCT__PID__TITLE: 'product/:pid/:title',
    DETAIL_PRODUCT: 'product',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',
    DETAIL_CART: "my-cart",
    NOT_FOUND_404: "*",
    DETAIL_BLOG_BID_TITLE: 'blog/:bid/:title',
    DETAIL_BLOG:'blog',
    REGISTER:"register",



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
    MANAGE_BLOG: "manage-blog",
    CREATE_BLOG: "create-blog",



    //Menber
    MEMBER: "menber",
    PERSONAL: "personal",
    MY_CART: "my-cart",
    HISTORY: "buy-history",
    WISHLIST: "wishlist",
    CHECKOUT: "checkout"


}


export default path