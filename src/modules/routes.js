import authRouter from "./auth/auth.routes.js"
import brandRoutes from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRoutes from "./category/category.routes.js"
import couponRouter from "./coupun/coupon.routes.js"
import orderRoutes from "./order/order.routes.js"
import productRoutes from "./products/products.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRoutes from "./subCategory/subCategory.routes.js"
import userRoutes from "./user/user.routes.js"
import wichListRouter from "./wishList/wishList.routes.js"


export const allRoutes = (app) =>{
    app.use("/api/v1/category",categoryRoutes)
    app.use("/api/v1/subcategory",subCategoryRoutes)
    app.use("/api/v1/brand",brandRoutes)
    app.use("/api/v1/product",productRoutes)
    app.use("/api/v1/user",userRoutes)
    app.use("/api/v1/auth",authRouter)
    app.use("/api/v1/review",reviewRouter)
    app.use("/api/v1/coupon",couponRouter)
    app.use("/api/v1/cart",cartRouter)
    app.use("/api/v1/order",orderRoutes)
    app.use("/api/v1/wichList",wichListRouter)

}