import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { fetchUsers } from "@/util/userActions";
import { Suspense } from "react";
interface Users {
  id: string;
  email: string;
  name: string;
  password: string;
}
export default async function Home() {
  const { data } = await fetchUsers();
  return (
    <>
      <div className="h-[92vh] w-full bg-blue-100 flex justify-between ">
        <div className="h-full w-1/4 bg-red-100">
          <LeftPanel />
        </div>
        <div className="h-full w-full bg-red-200">
          <Suspense
            fallback={
              <div className="h-10 w-10 border-solid border-t-blue-300 border-2 rounded-3xl animate-spin"></div>
            }
          >
            <RightPanel users={data} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
