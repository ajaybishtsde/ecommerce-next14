"use client";
import { updateProduct } from "@/util/productActions";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
interface ProductsList {
  name: string;
  description: string;
  price: string;
  status: string;
  image: string;
}
const handelProductStatus = async (
  e: React.ChangeEvent<HTMLInputElement>,
  name: string
) => {
  const value = e.target.checked ? "approved" : "created";
  const result = await updateProduct(name, value);
  if (result?.status) {
    alert("status changed");
  }
};

const ProductComponent = ({ products }: { products: ProductsList[] }) => {
  const { data: session } = useSession();
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        {products.length &&
          products.map((item: ProductsList, i: number) => {
            return (
              <>
                <div
                  key={i}
                  className="col-span-3 bg-red-400 flex justify-center items-center flex-col p-2 gap-2"
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    value={item.status}
                    checked={item.status === "approved"}
                    className="self-start w-5 h-5"
                    disabled={session?.user.role !== "reviewer"}
                    onChange={(e) => {
                      handelProductStatus(e, item.name);
                    }}
                  />
                  <div className="w-full h-52 flex justify-center">
                    <Image
                      alt="pizza"
                      src={`${item.image}`}
                      width={150}
                      height={150}
                    />
                  </div>
                  <p className="text-lg font-serif font-bold">{item.name}</p>
                  <p className="font-serif text-wrap ">{item.description}</p>
                  <p>{`${item.price} ₹`}</p>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default ProductComponent;
