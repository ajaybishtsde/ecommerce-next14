"use client";
import { useState } from "react";

const LeftPanel = () => {
  const [loginView, setLoginView] = useState(true);
  return (
    <>
      <div className="w-full h-full ">
        <p className="text-center pt-4">
          Please toggle the button to see the view
        </p>
        <div className="w-full flex justify-center mt-6 gap-4">
          <button
            className={`bg-blue-500   text-white p-2 rounded-md w-28 hover:scale-105 ${
              loginView && "text-blue-900 bg-white"
            }`}
            onClick={() => setLoginView(true)}
          >
            Sign in
          </button>
          <button
            className={`bg-blue-500   text-white p-2 rounded-md w-28 hover:scale-105 ${
              !loginView && "text-blue-900 bg-white"
            }`}
            onClick={() => setLoginView(false)}
          >
            Sign Up
          </button>
        </div>

        {loginView ? (
          <form
            action=""
            className="w-full pe-6 ps-6 h-1/4 mt-8 flex justify-center items-center flex-col"
          >
            <input
              type="email"
              name=""
              placeholder="username / email"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <input
              type="password"
              name=""
              placeholder="password"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <button className="mb-4 w-2/4 h-10 bg-blue-500 hover:text-blue-900 hover:bg-white text-white rounded-md ">
              Sign in
            </button>
          </form>
        ) : (
          <form
            action=""
            className="w-full pe-6 ps-6 h-2/4 flex justify-center items-center flex-col"
          >
            <input
              type="text"
              name=""
              placeholder="first name"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <input
              type="text"
              name=""
              placeholder="last name"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <input
              type="email"
              name=""
              placeholder="email"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <input
              type="password"
              name=""
              placeholder="password"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <button className="mb-4 w-2/4 h-10 bg-blue-500 hover:scale-105 text-white rounded-md ">
              Sign up
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default LeftPanel;
