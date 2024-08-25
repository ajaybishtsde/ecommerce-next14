import LeftPanel from "@/components/LeftPanel";

export default function Home() {
  return (
    <>
      <div className="h-[92vh] w-full bg-blue-100 flex justify-between ">
        <div className="h-full w-1/4 bg-red-100">
          <LeftPanel />
        </div>
        <div className="h-full w-full bg-red-200">Right pannel</div>
      </div>
    </>
  );
}
