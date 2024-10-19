import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboardpage from "./pages/Dashboardpage";
import Registerpage from "./pages/Registerpage";
import Verificationpage from "./pages/Verificationpage";
import CreateInterviewpage from "./pages/CreateInterviewpage";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Registerpage />} />
          <Route path="/home" element={<Dashboardpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/verification" element={<Verificationpage />} />
          <Route path="/interview" element={<CreateInterviewpage />} />

        </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
