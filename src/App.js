import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Proudcts from "./Components/Proudcts/proudcts";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import About from "./Components/About/About";
import Categories from "./Components/Categories/Categories";
import NotFound from "./Components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "proudcts", element: <Proudcts /> },
        { path: "categories", element: <Categories /> },
        { path: "about", element: <About /> },
        { path: "cart", element: <Cart /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
