// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import home from "../assets/home.svg";
import { useNavigate } from "react-router-dom";

const CreateInterview = () => {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/home");
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ',' || event.key === ' ') {
            event.preventDefault();
            const trimmedInput = inputValue.trim();
            if (trimmedInput && !tags.includes(trimmedInput)) {
                setTags([...tags, trimmedInput]);
                setInputValue('');
            }
        }
    };
    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    
};
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
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 w-[600px]">
          <form onSubmit={handleSubmit} className="flex flex-col justify-end">
            <div className="flex justify-between">
              <label>Job Title</label>
              <input className="w-64 px-5 py-3 mt-4 ml-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
            </div>
            <div className="flex justify-between">
              <label>Job Desciption</label>
              <textarea className="w-64 px-5 py-3 mt-4 ml-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" ></textarea>
            </div>
            <div className="flex justify-between">
              <label>Experience Level</label>
              <input className="w-64 px-5 py-3 mt-4 ml-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
            </div>
            <div className="flex justify-between">
              <label>Add Candidate</label>
              
                      </div>
                      <div className={`bootstrap-tagsinput ${isFocused ? 'has-focus' : ''} border p-2 rounded`}>
      {tags.map((tag, index) => (
        <span key={index} className="badge badge-primary mx-1">
          {tag}
          <button
            type="button"
            className="btn-close ml-2"
            onClick={() => handleRemoveTag(index)}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        className="w-64 px-5 py-3 mt-4 ml-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Add a tag..."
      />
    </div>
            <div className="flex justify-between">
              <label>End Date</label>
              <input className="w-64 px-5 py-3 mt-4 ml-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
            </div>
            <button
              type="submit"
              className="m-4 ml-32 tracking-wide font-semibold bg-blue-900 text-gray-100 w-32  rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <span className="">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInterview;
