"use client";
import { addProductToDB } from "@/util/productActions";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import { useFormStatus } from "react-dom";

const AddProduct = () => {
  const { data: session } = useSession();
  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        {!pending ? (
          <button
            type="submit"
            disabled={session?.user.role !== "editor"}
            className={`mb-4 w-1/4 h-10 bg-blue-500 ${
              session?.user.role === "editor" &&
              "hover:text-blue-900 hover:bg-white cursor-pointer"
            } text-white rounded-md`}
          >
            Add
          </button>
        ) : (
          <div className="h-10 w-10 border-solid border-t-red-300 border-2 rounded-3xl animate-spin"></div>
        )}
      </>
    );
  };
  const ref = useRef<HTMLFormElement>(null);
  return (
    <>
      <div className="bg-blue-200 col-span-4 h-[92vh] ">
        <div className="flex justify-center">
          <h2 className="font-serif font-bold text-center mt-2 border-b-2 border-red-300 w-2/3 ">
            Add New Product
          </h2>
        </div>
        <form
          ref={ref}
          action={async (formData) => {
            ref.current && ref.current.reset();
            await addProductToDB(formData);
          }}
          className="w-full pe-6 ps-6 h-1/4 mt-8 flex justify-center items-center flex-col"
        >
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="mb-4 ps-2 w-full h-10 focus-within:outline-gray-200 hover:scale-105 rounded-md"
          />
          <SubmitButton />
        </form>
      </div>
    </>
  );
};

export default AddProduct;
