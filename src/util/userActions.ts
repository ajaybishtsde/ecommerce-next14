"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { z } from "zod";
const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
export const saveUser = async (formData: FormData) => {
  await prisma.$connect();
  const data = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!data.success) {
    return {
      status: false,
      message: "Validation failed",
    };
  }
  try {
    const user = await prisma.user.create({ data: data.data });
    console.log("user", user);
    return {
      status: true,
      user,
    };
  } catch (error) {
    console.log("error", error);
  }
};
