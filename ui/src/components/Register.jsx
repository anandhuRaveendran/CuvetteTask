/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("Authtoken"))
      ?.split("=")[1];

    if (authToken) {
      navigate("/profile");
    }
  }, [navigate]);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!username) validationErrors.username = "Username is required";
    if (!email || !validateEmail(email))
      validationErrors.email = "Invalid email address";
    if (!phone || !validatePhone(phone))
      validationErrors.phone = "Phone number must be exactly 10 digits";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const handleSendEmailOtp = async () => {
        try {
          const response = await axios.post('http://localhost:3000/send-email-otp', { email });
          setMessage(response.data.message);
          setStep(2);  // Move to OTP input step
        } catch (error) {
          setMessage('Error sending OTP: ' + error.response.data.message);
        }
      };
    
      const handleSendPhoneOtp = async () => {
        try {
          const response = await axios.post('http://localhost:3000/send-phone-otp', { phone });
          setMessage(response.data.message);
          setStep(2);  // Move to OTP input step
        } catch (error) {
          setMessage('Error sending OTP: ' + error.response.data.message);
        }
      };
      navigate("/verification");
      handleSendEmailOtp();
       handleSendPhoneOtp();
      const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("companyname", companyname);
console.log(username,phone,companyname,email)
    // const response = await fetch("/api/signup", {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = await response.json();

    // if (data.message === "User registered successfully") {
    //   toast.success("Registration successful! Redirecting...");
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 2000); // Give time for toast to be visible before navigating
    // } else {
    //   toast.error(data.error || "An error occurred during registration");
      // }

    
      const handleVerifyOtp = async () => {
        try {
          const response = await axios.post('http://localhost:3000/verify-otp', {
            emailOrPhone: email || phone,
            otp
          });
          setMessage(response.data.message);
        } catch (error) {
          setMessage('Error verifying OTP: ' + error.response.data.message);
        }
      };
  };

  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow-2xl sm:rounded-lg flex justify-center h-[700px] flex-1">
        <div className="flex-1 bg-white-900 text-center hidden md:flex">
          <div className="p-40">Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley</div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-xs flex flex-col gap-4"
              >
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                    errors.username ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="text"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
                )}
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                              )}
                                              <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                    errors.username ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="text"
                  placeholder="Company Name"
                  value={companyname}
                  onChange={(e) => setCompanyname(e.target.value)}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.companyname}</p>
                )}
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white`}
                  type="email"
                  placeholder="Company Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                              )}
                               <p className="mt-6 text-xs text-gray-600 text-center">
                               By clicking on proceed you wil accept our <br/><span> <a className="text-blue-400" href="https://cuvette.tech/privacy/" target="_blank">Terms & Conditions</a></span>                 
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span className="ml-3">Proceed</span>
                </button>
               

                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
