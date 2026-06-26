import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Home from './pages/Home'
import MainLayout from './pages/MainLayout'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SalesPage from './pages/SalesPage'
import AddProductPage from './pages/AddProductPage'
import AdminSideProducts from './pages/AdminSideProducts'
import AdminShowUsersPage from './pages/AdminShowUsersPage'
import AdminOrdersPage from './pages/AdminOrdersPage'
import AdminEditUserInfo from './pages/AdminEditUserInfo'
import AdminUserOrderDetails from './pages/AdminUserOrderDetails'
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import ProductDetailPage from './pages/ProductDetailPage'
import { useAuthStore } from './store/auth.store'
import AuthRoute from './routes/AuthRoute'
import VerifyRoute from './routes/VerifyRoute'
import PageNotFound from './components/PageNotFound'


function App() {

  const fetchUser = useAuthStore((state) => state.fetchUser);
  const email = useAuthStore((state)=>state.email);

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='products/:id' element={<ProductDetailPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-success' element={<OrderSuccess />} />

        <Route element={<AuthRoute />} >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          {/* <Route element={<VerifyRoute />} > */}
            <Route path='/verify' element={<Verify />} />
          {/* </Route> */}
        </Route>


        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Navigate to="sales" replace />} />
          <Route path='sales' element={<SalesPage />} />
          <Route path='add-product' element={<AddProductPage />} />
          <Route path='products' element={<AdminSideProducts />} />


          <Route path='users' element={<AdminShowUsersPage />} />
          <Route path='users/orders/:userId' element={<AdminUserOrderDetails />} />
          <Route path='users/:userId' element={<AdminEditUserInfo />} />
          <Route path='orders' element={<AdminOrdersPage />} />

        </Route>

        <Route path='*' element={<PageNotFound/>}/>

      </Routes>
    </MainLayout>

  )
}

export default App
