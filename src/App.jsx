import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import MainLayout from './layouts/MainLayout'

import Category from './components/Category'
import Product from './components/Product'
import Role from './components/Role'
import Staff from './components/Staff'
import Supplier from './components/Supplier'
import User from './components/User'
import Order_detail from './components/Order_detail'
import Error404page from './pages/Error404page'
import RequireAuth from './components/RequireAuth'

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='*' element={<Error404page />} />
        <Route element={<RequireAuth />}>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='categories' element={<Category />} />
            <Route path='roles' element={<Role />} />
            <Route path='products' element={<Product />} />
            <Route path='staff' element={<Staff />} />
            <Route path='suppliers' element={<Supplier />} />
            <Route path='users' element={<User />} />
            <Route path='order-details' element={<Order_detail />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;



// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

// // Layout
// import MainLayout from './layouts/MainLayout';

// // Auth Pages
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';

// // Dashboard Sections
// import Dashboard from './pages/Dashboard'; // This is the default welcome component
// import Category from './components/Category';
// import Product from './components/Product';
// import Role from './components/Role';
// import Staff from './components/Staff';
// import Supplier from './components/Supplier';
// import User from './components/User';
// import Order_detail from './components/Order_detail';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<SignUpPage />} />

//         {/* Protected Routes wrapped with sidebar layout */}
//         <Route path="/" element={<MainLayout />}>
//           {/* Default page when none is selected */}
//           <Route index element={<Dashboard />} />

//           {/* Sidebar sections */}
//           <Route path="categories" element={<Categories />} />
//           <Route path="products" element={<Products />} />
//           <Route path="roles" element={<Roles />} />
//           <Route path="staff" element={<Staff />} />
//           <Route path="suppliers" element={<Suppliers />} />
//           <Route path="users" element={<Users />} />
//           <Route path="order-details" element={<OrderDetails />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


