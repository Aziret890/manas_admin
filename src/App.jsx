import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Swagger from "./pages/Swagger";
import Password from "./pages/Password";
import About from "./components/about/About";
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
    element: <About/>
  },
]);
function App() {
  return (
    <>
      {/* <News />
      <About /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
