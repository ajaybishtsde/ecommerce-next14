"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
import { z } from "zod";
export const addProductToDB = async (formData: FormData) => {
  revalidatePath("/dashboard");
  const userSchema = z.object({
    name: z.string().min(3, "Product name should have minimum 3 characters"),
    description: z.string(),
    price: z.number(),
  });
  try {
    await prisma.$connect();
    const data = userSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
    });
    // console.log("product data", data, ":error", data?.error?.message);
    if (!data.success) {
      return {
        status: false,
        message: JSON.parse(data.error.message),
      };
    }
    const { description, name, price } = data.data;
    const productAdded = await prisma.products.create({
      data: { name, price, description },
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
