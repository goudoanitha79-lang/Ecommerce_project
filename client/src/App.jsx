import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";

import Home from "./pages/Home";

import Cart from "./pages/Cart";

import Login from "./pages/Login";

import Register from "./pages/Register";

import AdminLogin from "./pages/AdminLogin";

import AdminDashboard from "./pages/AdminDashboard";

import AdminUsers from "./pages/AdminUsers";

import AdminProducts from "./pages/AdminProducts";

import AddProduct from "./pages/AddProduct";

import EditProduct from "./pages/EditProduct";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<SplashScreen />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />

        <Route
          path="/admin/products"
          element={<AdminProducts />}
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/edit-product/:id"
          element={<EditProduct />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;