"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();
import { z } from "zod";
const userSchema = z.object({
  name: z.string().min(3, "name should contain atleast 3 alphabets"),
  email: z.string(),
  password: z.string().min(4, "Password should contain minimum 4 characters"),
});
export const saveUser = async (formData: FormData) => {
  revalidatePath("/");
  await prisma.$connect();
  const data = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!data.success) {
    return {
      status: false,
      error: data.error.flatten(),
    };
  }
  try {
    const user = await prisma.user.create({ data: data.data });
    return {
      status: true,
      user,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      error: error,
    };
  }
};
// get users
export const fetchUsers = async () => {
  await prisma.$connect();
  try {
    const users = await prisma.user.findMany({
      select:{
        name:true,
        email:true,
        role:true
      }
    });
    return {
      status: true,
      data: users,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      error: error,
    };
  }
};
// remove user
export const removeUser = async (email:string) => {
  await prisma.$connect();
  try {
    const deleteUser = await prisma.user.deleteMany({
      where: { email: email },
    });
    console.log("deleteUser", deleteUser);
    if (deleteUser) {
      return {
        status: true,
        message: `user is removed from db`,
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      error: error,
    };
  }
  revalidatePath("/");
};
// add user role
export const addUserRole = async (role: string, email: string) => {
  revalidatePath('/')
  await prisma.$connect();
  if (!email || !role) {
    return {
      status: false,
      error: `role and email are required`,
    };
  }
  try {
    const user = await prisma.role.findUnique({
      where: {
        userEmail: email,
      },
    });
    console.log("user",user,"email",email)
    let result;
    if (user) {
      result = await prisma.role.update({
        where: {
          userEmail: email,
        },
        data: { name: role },
      });
    } else {
      result = await prisma.role.create({
        data: { name: role, userEmail: email },
      });
    }
    if (result) {
      return {
        status: true,
        data: result,
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
