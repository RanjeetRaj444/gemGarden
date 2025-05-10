import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { Admin } from "../Pages/admin/Admin";
import { Login } from "../Pages/Login";
import { SignUp } from "../Pages/SignUp";
import { Product } from "../Pages/Product";
import SingleProductPage from "../Pages/SingleProductPage";
import { Cart } from "../Pages/Cart";
import { Payment } from "../Pages/Payment";
import { AdminLogin } from "../Pages/admin/AdminLogin";
import { PrivateRoute } from "./PrivateRoute";
import Profile from "../Pages/Profile";

export const MainRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
};
