import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./pages/Layout";
import Register from "./features/Register/Register";
import Login from "./features/Login/Login";
import Cart from "./features/Cart/Cart";
import Shop from "./features/Shop/Shop";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import SingleItemPage from "./features/Shop/SingleItemPage/SingleItemPage";
import LayoutShop from "./pages/LayoutShop";
import { useState } from "react";
import { CATEGORIES } from "./const/PillsCategories";

export default function App() {
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES.All);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Register />} index />
            <Route element={<Login />} path="login" />
            <Route element={<Unauthorized />} path="unauthorized" />

            <Route element={<LayoutShop />} path="/shop">
              <Route
                element={
                  <Shop
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                  />
                }
                index
              />
              <Route
                element={
                  <SingleItemPage
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                  />
                }
                path=":productId"
              />

              <Route
                element={
                  <Cart
                    currentCategory={currentCategory}
                    setCurrentCategory={setCurrentCategory}
                  />
                }
                path="cart"
              />
            </Route>

            <Route element={<Missing />} path="*" />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
