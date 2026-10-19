
import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import PropertyManagement from './pages/PropertyManagement'

// Admin pages
import AdminLogin from './admin/AdminLogin'
import AdminProperties from './admin/AdminProperties'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <ScrollToTop />

      <Routes>
        {/* Admin routes — without the public website layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/properties" element={<AdminProperties />} />

        {/* Existing public website layout */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <SearchBar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/orders" element={<Orders />} />
                <Route
                  path="/management"
                  element={<PropertyManagement />}
                />
              </Routes>

              <Footer />
            </>
          }
/>
      </Routes>

      <Analytics />
    </div>
  )
}

export default App
