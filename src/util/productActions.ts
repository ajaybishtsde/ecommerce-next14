"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
import { z } from "zod";
const userSchema = z.object({
  name: z.string().min(3, "Product name should have minimum 3 characters"),
  description: z.string(),
  price: z.number(),
});
// add products to db
export const addProductToDB = async (formData: FormData) => {
  revalidatePath("/dashboard");

  try {
    await prisma.$connect();
    const data = userSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
    });
    if (!data.success) {
      return {
        status: false,
        message: JSON.parse(data.error.message),
      };
    }
    const { description, name, price } = data.data;
    const productAdded = await prisma.products.create({
      data: {
        name,
        price,
        description,
        // image: "/chickenpizza.png",
        // image: "/doublecheese.png",
        // image: "/extracheese.png",
        // image: "/extraveggie.png",
        // image: "/veg.png",
        image: "/vegrole.png",
        status: "created",
      },
    });
    if (productAdded) {
      return {
        status: true,
        data: productAdded,
      };
    }
  } catch (error) {
    console.log("error", error);
  }
};
// get products from db
export const getProductsList = async () => {
  revalidatePath("/dashboard");
  await prisma.$connect();
  try {
    const list = await prisma.products.findMany({
      select: {
        name: true,
        price: true,
        description: true,
        image: true,
        status: true,
      },
    });
    if (list) {
      return {
        status: true,
        data: list,
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      error: error,
    };
  }
};
// update product
export const updateProduct = async (name: string, status: string) => {
  revalidatePath("/dashboard");
  await prisma.$connect();
  try {
    const result = await prisma.products.updateMany({
      where: {
        name,
      },
      data: { status },
    });
    if (result.count) {
      return {
        status: true,
        message: "Status updated",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      error: error,
    };
  }
};
