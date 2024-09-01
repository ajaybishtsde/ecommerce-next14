import AddProduct from "@/components/AddProduct";
import ProductComponent from "@/components/ProductComponent";
import { addProductToDB, getProductsList } from "@/util/productActions";
import { Suspense } from "react";
interface ProductsList {
  name: string;
  description: string;
  price: string;
  status: string | null;
  imgae: string | null;
}

const Page = async () => {
  const list: any = await getProductsList();
  let products;
  if (list.status) {
    products = list.data;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <AddProduct />
        <div className="bg-blue-300 col-span-8 h-[92vh]">
          <Suspense
            fallback={
              <div className="h-10 w-10 border-solid border-t-blue-300 border-2 rounded-3xl animate-spin"></div>
            }
          >
            <ProductComponent products={products} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Page;
