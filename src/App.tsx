import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./features/Cart/Cart";
import Favourite from "./features/Favourite/Favourite";
import Login from "./features/Login/Login";
import Profile from "./features/Profile/Profile";
import Register from "./features/Register/Register";
import Shop from "./features/Shop/Shop";
import SingleItemPage from "./features/Shop/SingleItemPage/SingleItemPage";
import Layout from "./pages/Layout";
import LayoutCart from "./pages/LayoutCart";
import LayoutDefault from "./pages/LayoutDefault";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import AddProducts from "./features/AddProducts/AddProducts";
import Permission from "./features/GivePermissions/Permission";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Register />} path="register" />
            <Route element={<Login />} path="login" />
            <Route element={<Unauthorized />} path="unauthorized" />

            <Route element={<LayoutCart />}>
              <Route element={<LayoutDefault />} path="shop">
                <Route element={<Shop />} index />
                <Route element={<SingleItemPage />} path=":productId" />
              </Route>

              <Route element={<LayoutDefault />} path="cart">
                <Route element={<Cart />} index />
              </Route>
            </Route>

            <Route element={<LayoutDefault />} path="favourite">
              <Route element={<Favourite />} index />
            </Route>

            <Route element={<LayoutDefault />} path="profile">
              <Route element={<Profile />} path=":userId" />
            </Route>

            <Route element={<LayoutDefault />} path="add/products">
              <Route element={<AddProducts />} index />
            </Route>

            <Route element={<LayoutDefault />} path="permissions">
              <Route element={<Permission />} index />
            </Route>
            <Route element={<Missing />} path="*" />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
