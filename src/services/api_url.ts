const base = import.meta.env.VITE_API_URL + "/api"

export const Product_API: string = base + '/products';
export const Brand_API: string = base + '/brands';
export const Category_API: string = base + '/categories';
export const Color_API: string = base + '/colors';
export const Cart_API: string = base + '/cart';
export const User_API: string = base + '/user';
export const Order_API: string = base + '/orders'