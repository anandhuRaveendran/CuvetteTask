// eslint-disable-next-line no-unused-vars
import React from "react";
import home from "../assets/home.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
navigate("/interview")
    }
  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <img src={home} className="h-8" alt="dashboard Logo" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div>
                      <button
                          onClick={handleSubmit}
              className=" tracking-wide font-semibold bg-blue-900 text-gray-100 w-64  rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="">Create Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
