import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import { Login, Home, Public, Products, DetailProduct, FAQ, Contact, FinalRegister, ResetPassword, Blog } from "./pages/public"
import { Admin, CreateBrand, CreateCategory, CreateProduct, Dashboard, ManageBrand, ManageCategory, ManageOder, ManageProduct, ManageUser } from './pages/admin'
import { History, Menber, MyCart, Personal, Wishlist } from './pages/member'
import path from "./utils/path"
import { getCategories } from './redux/category/asyncAction';
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Modal } from "./components"
import { getBrands } from './redux/brand/asyncAction';

function App() {

  const dispatch = useDispatch()

  const { isShowModal, modalChildren } = useSelector(state => state.category)

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getBrands())
  }, [])

  return (
    <div className="font-main relative">
      {isShowModal && <Modal>
        {modalChildren}
      </Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS} element={<Products />} />
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.BLOG} element={<Blog />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.FAQ} element={<FAQ />} />
          <Route path={path.ALL} element={<Home />} />

        </Route>

        {/* admin */}
        <Route path={path.ADMIN} element={<Admin />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOder />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_CATEGORY} element={<CreateCategory />} />
          <Route path={path.MANAGE_CATEGORY} element={<ManageCategory />} />
          <Route path={path.CREATE_BRAND} element={<CreateBrand />} />
          <Route path={path.MANAGE_BRAND} element={<ManageBrand />} />

        </Route>

        {/* Menber */}
        <Route path={path.MEMBER} element={<Menber />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<MyCart />} />
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
