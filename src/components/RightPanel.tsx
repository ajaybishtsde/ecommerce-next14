"use client";
import { addUserRole, removeUser } from "@/util/userActions";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
    alert("Role updated ");
  }
};
const deleteUser = async (email: string) => {
  const result = await removeUser(email);
  if (result?.status) {
    alert("user removed from db");
  }
};

const RightPanel = ({ users }: Users[] | any) => {
  const { data: session } = useSession();
  {
    if (!session) {
      return (
        <>
          <div className="h-[92vh] w-full p-2 flex justify-center items-center">
            <h2>Sign in to access the services</h2>
          </div>
        </>
      );
    }
  }
  return (
    <>
      <h2>Users</h2>
      <div className="max-h-full w-full p-2 grid md:grid-cols-12 gap-4 bg-red-900">
        {users.map((item: Users, i: number) => {
          return (
            <div className="h-36 bg-blue-200 col-span-3" key={i}>
              <Link className="text-blue-900 ps-2" href={"/dashboard"}>
                Go to dashboard
              </Link>
              <div className="w-full h-20 p-2 flex">
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
              {item.email === session.user.email ? (
                <span className="text-red-500 ms-2">
                  You can not change your role
                </span>
              ) : (
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
                    disabled={session?.user?.role !== "admin"}
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
                    disabled={session?.user?.role !== "admin"}
                    checked={item.role && item.role?.name === "reviewer"}
                    onChange={(e) => {
                      saveRole(item.email, e);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RightPanel;
