import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboardpage from "./pages/Dashboardpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Verificationpage from "./pages/Verificationpage";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Loginpage />} />
          <Route path="/home" element={<Dashboardpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/verification" element={<Verificationpage />} />

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
