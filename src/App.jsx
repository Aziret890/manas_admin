import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Swagger from "./pages/Swagger";
import Password from "./pages/Password";
import About from "./components/about/About";
import SwipperHome from "./components/swipperHome/SwipperHome";
import Year from "./components/year/Year";
import Sertificate from "./components/sertificate/Sertificate";
import Partners from "./components/partners/Partners";
import Proud from "./components/proud/Proud";
import News from "./components/news/News";
import PartnersInformation from "./components/parentInformation/ParentInformation";
import ChildrenInformation from "./components/childrenInforamtion/ChildrenInformation";
import ParentSchool from "./pages/ParentSchool";
import TimeLessons from "./components/timeLessons/TimeLessons";
import Forma from "./components/timeLessons/TimeLessons";
import Teacher from "./components/teacher/Teacher";

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
  {
    path: "/proud",
    element: <Proud />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/parent/information",
    element: <PartnersInformation />,
  },
  {
    path: "/children/information",
    element: <ChildrenInformation />,
  },
  {
    path: "/parent/school",
    element: <ParentSchool />,
  },
  {
    path: "/time/lessons",
    element: <TimeLessons />,
  },
  {
    path: "/forma",
    element: <Forma />,
  },
  {
    path: "/teacher",
    element: <Teacher />,
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
