import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Swagger from "./pages/Swagger";
import Password from "./pages/Password";
import About from "./components/about/About";
import SwipperHome from "./components/swipperHome/SwipperHome";
import Year from "./components/year/Year";
import Sertificate from "./components/sertificate/Sertificate";
import Partners from "./components/partners/Partners";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Password />,
  },
  {
    path: "/swagger",
    element: <Swagger />,
  },
  {
    path: "/about/me",
    element: <About />,
  },
  {
    path: "/swapper/home",
    element: <SwipperHome />,
  },
  {
    path: "/we/numbers/",
    element: <Year />,
  },
  {
    path: "/sertificate",
    element: <Sertificate />,
  },
  {
    path: "/partners",
    element: <Partners />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
