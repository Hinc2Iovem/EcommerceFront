import { Route, Routes } from "react-router-dom";
import USER_ROLES from "./const/USER_ROLES";
import { AuthProvider } from "./context/AuthContext";
import AddProducts from "./features/AddProducts/AddProducts";
import RequireAuth from "./features/Auth/RequireAuth/RequireAuth";
import Cart from "./features/Cart/Cart";
import DefaultProducts from "./features/DefaultProducts/DefaultProducts";
import Favourite from "./features/Favourite/Favourite";
import Permission from "./features/GivePermissions/Permission";
import Profile from "./features/Profile/Profile";
import RecommendedProducts from "./features/RecommendedProducts/RecommendedProducts";
import Shop from "./features/Shop/Shop/Shop";
import SingleItemPage from "./features/Shop/SingleItemPage/SingleItemPage";
import Layout from "./pages/Layout";
import LayoutCart from "./pages/LayoutCart";
import LayoutDefault from "./pages/LayoutDefault";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./features/Auth/RequireAuth/PersistLogin";
import Login from "./features/Auth/Login/Login";
import Register from "./features/Auth/Register/Register";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route element={<Unauthorized />} path="unauthorized" />
            <Route element={<LayoutDefault />} path="auth">
              <Route element={<Login />} index />
              <Route element={<Register />} path="register" />
            </Route>

            <Route element={<PersistLogin />}>
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

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[
                      USER_ROLES.CUSTOMER,
                      USER_ROLES.SELLER,
                      USER_ROLES.ADMIN,
                    ]}
                  />
                }
              >
                <Route element={<LayoutDefault />} path="profile">
                  <Route element={<Profile />} path=":userId" />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[USER_ROLES.SELLER, USER_ROLES.ADMIN]}
                  />
                }
              >
                <Route element={<LayoutDefault />} path="add/products">
                  <Route element={<AddProducts />} index />
                </Route>
              </Route>

              <Route
                element={<RequireAuth allowedRoles={[USER_ROLES.ADMIN]} />}
              >
                <Route element={<LayoutDefault />} path="permissions">
                  <Route element={<Permission />} index />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[USER_ROLES.SELLER, USER_ROLES.ADMIN]}
                  />
                }
              >
                <Route element={<LayoutDefault />} path="recommendedProducts">
                  <Route element={<RecommendedProducts />} index />
                </Route>
              </Route>

              <Route
                element={
                  <RequireAuth
                    allowedRoles={[USER_ROLES.SELLER, USER_ROLES.ADMIN]}
                  />
                }
              >
                <Route element={<LayoutDefault />} path="defaultProducts">
                  <Route element={<DefaultProducts />} index />
                </Route>
              </Route>
              <Route element={<Missing />} path="*" />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
