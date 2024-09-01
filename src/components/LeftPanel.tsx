"use client";
import { saveUser } from "@/util/userActions";
import { FormEvent, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import swal from "sweetalert";

const LeftPanel = () => {
  const [loginView, setLoginView] = useState(true);
  const ref = useRef<HTMLFormElement>(null);

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        {!pending ? (
          <button className="mb-4 w-2/4 h-10 bg-blue-500 hover:scale-105 text-white rounded-md ">
            Sign up
          </button>
        ) : (
          <div className="h-10 w-10 border-solid border-t-blue-300 border-2 rounded-3xl animate-spin"></div>
        )}
      </>
    );
  };
  return (
    <>
      <div className="w-full h-full ">
        <p className="text-center pt-4">
          Please toggle the button to see the view
        </p>
        <div className="w-full flex justify-center mt-6 gap-4">
          <button
            className={` p-2 rounded-md w-28 ${
              loginView
                ? "bg-white text-blue-300"
                : "bg-blue-500 hover:scale-105 text-white"
            }`}
            onClick={() => setLoginView(true)}
          >
            Sign in
          </button>
          <button
            className={` p-2 rounded-md w-28  ${
              !loginView
                ? "bg-white text-blue-300"
                : "bg-blue-500 hover:scale-105 text-white"
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
            <button
              type="submit"
              className="mb-4 w-2/4 h-10 bg-blue-500 hover:text-blue-900 hover:bg-white text-white rounded-md "
            >
              Sign in
            </button>
          </form>
        ) : (
          <form
            ref={ref}
            action={async (formData) => {
              ref.current && ref?.current.reset();
              saveUser(formData);
            }}
            className="w-full pe-6 ps-6 h-2/4 flex justify-center items-center flex-col"
          >
            <input
              type="text"
              name="name"
              placeholder="first name"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />

            <input
              type="email"
              name="email"
              placeholder="email"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
            />
            <SignUpButton />
          </form>
        )}
      </div>
    </>
  );
};

export default LeftPanel;
