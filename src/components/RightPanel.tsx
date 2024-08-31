"use client";
import { addUserRole, removeUser } from "@/util/userActions";
import Link from "next/link";
import { Suspense, use } from "react";

interface Users {
  name: string;
  email: string;
  role: {
    name: string;
    userEmail: string;
  };
}
const saveRole = async (
  email: string,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const result = await addUserRole(e.target.value, email);
  if (result?.status) {
    swal("Role updated ");
  }
};
const deleteUser = async (email: string) => {
  const result = await removeUser(email);
  console.log("result>>>>>>>>>>", result);
  if (result?.status) {
    swal("user removed from db");
  }
};
const RightPanel = ({ users }: Users[] | any) => {
  return (
    <>
      <h2>Users</h2>
      <div className="min-h-30 max-h-full w-full p-2 flex justify-center items-center gap-2 flex-wrap">
        {users.map((item: Users, i: number) => {
          return (
            <div className="w-96 h-28 bg-blue-200 " key={i}>
              <Link href={"/dashboard"}>Go to dashboard</Link>
              <div className="w-96 h-20 p-2 flex">
                <ul className="w-full h-full">
                  <li className="text-red-400">
                    <span className="text-black">Name: </span> {item.name}
                  </li>
                  <li className="text-red-400">
                    <span className="text-black">Email: </span> {item.email}
                  </li>
                </ul>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    deleteUser(item.email);
                  }}
                >
                  X
                </div>
              </div>
              <div className="w-full h-8 p-2">
                <span className="me-2">Role:</span>
                <label className="text-red-400 me-2">Editor</label>
                <input
                  type="radio"
                  name={`${item.email}-role`}
                  id=""
                  className="me-4"
                  value="editor"
                  checked={item.role && item.role.name === "editor"}
                  onChange={(e) => {
                    saveRole(item.email, e);
                  }}
                />
                <label className="text-red-400 me-2">Reviewer</label>
                <input
                  type="radio"
                  name={`${item.email}-role`}
                  id=""
                  value="reviewer"
                  checked={item.role && item.role?.name === "reviewer"}
                  onChange={(e) => {
                    saveRole(item.email, e);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RightPanel;
