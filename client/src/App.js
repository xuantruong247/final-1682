import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import { Login, Home, Public, Products, DetailProduct, FAQ, Contact, FinalRegister, ResetPassword, Blog, DetailCart, DetailBlog } from "./pages/public"
import { Admin, CreateBlog, CreateBrand, CreateCategory, CreateProduct, Dashboard, ManageBlog, ManageBrand, ManageCategory, ManageOder, ManageProduct, ManageUser } from './pages/admin'
import { Checkout, History, Menber, Personal, Wishlist } from './pages/member'
import path from "./utils/path"
import { getCategories } from './redux/category/asyncAction';
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-quill/dist/quill.snow.css";
import { Cart, Modal, NotFound404 } from "./components"
import { getBrands } from './redux/brand/asyncAction';
import { showCart } from './redux/category/categorySlide';


function App() {

  const dispatch = useDispatch()

  const { isShowModal, modalChildren, isShowCart } = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getBrands())
  }, [])

  const { current } = useSelector(state => state.user)


  return (
    <div className="font-main h-full relative w-full">
      {isShowCart && <div onClick={() => {
        dispatch(showCart())
      }} className='absolute inset-0 bg-overlay z-50 flex justify-end'>
        <Cart />
      </div>}
      {isShowModal && <Modal>
        {modalChildren}
      </Modal>}
      <Routes>
        <Route path={path.NOT_FOUND_404} element={<NotFound404 />} />
        <Route path={path.CHECKOUT} element={!current ? <Login /> : <Checkout />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.DETAIL_BLOG_BID_TITLE} element={<DetailBlog />} />


        </Route>

        {/* admin */}
        <Route path={path.ADMIN} element={current && current?.role === "admin" ? <Admin /> : <NotFound404 />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOder />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_CATEGORY} element={<CreateCategory />} />
          <Route path={path.MANAGE_CATEGORY} element={<ManageCategory />} />
          <Route path={path.CREATE_BRAND} element={<CreateBrand />} />
          <Route path={path.MANAGE_BRAND} element={<ManageBrand />} />
          <Route path={path.MANAGE_BLOG} element={<ManageBlog />} />
          <Route path={path.CREATE_BLOG} element={<CreateBlog />} />

        </Route>

        {/* Menber */}
        <Route path={path.MEMBER} element={<Menber />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<DetailCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
        </Route>

        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.LOGIN} element={<Login />} />


      </Routes>
    </div>
  );
}

export default App;
