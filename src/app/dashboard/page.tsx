"use client";
import { addProductToDB } from "@/util/productActions";
import React from "react";
import { useFormStatus } from "react-dom";

const Page = () => {
  const addProduct = async (formData: FormData) => {
    const result = await addProductToDB(formData);
    console.log("result", result);
    if (!result?.status) {
      alert(result?.message[0].message);
    }
  };
  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <>
        {!pending ? (
          <button
            type="submit"
            className="mb-4 w-1/4 h-10 bg-blue-500 hover:text-blue-900 hover:bg-white text-white rounded-md "
          >
            Add
          </button>
        ) : (
          <div className="h-10 w-10 border-solid border-t-red-300 border-2 rounded-3xl animate-spin"></div>
        )}
      </>
    );
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="bg-blue-200 col-span-4 h-[92vh] ">
          <div className="flex justify-center">
            <h2 className="font-serif font-bold text-center mt-2 border-b-2 border-red-300 w-2/3 ">
              Add New Product
            </h2>
          </div>
          <form
            action={addProduct}
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
        <div className="bg-blue-300 col-span-8 h-[92vh]">right</div>
      </div>
    </>
  );
};

export default Page;
