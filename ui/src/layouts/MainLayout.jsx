// layouts/MainLayout.js
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import NavBar from '../components/NavBar';

const MainLayout = () => {
  // const location = useLocation();
  // const noNavBarRoutes = ['/', '/register'];

  // const shouldHideNavBar = noNavBarRoutes.includes(location.pathname);

  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default MainLayout;
