import { FC, memo, useState } from "react";
import SideBar from "../components/SideBar";
import ChatApp from "@/components/Chatapp";

type LandingPageProps = {};

const LandingPage: FC<LandingPageProps> = () => {
  interface SharedDataState {
    directMessage: boolean;
    groups: boolean;
  }

  const [sharedData, setSharedData] = useState<SharedDataState>({
    directMessage: false,
    groups: false,
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar with a fixed width */}
      <div className=" bg-gray-900 text-white">
        <SideBar setSharedData={setSharedData} />
      </div>

      {/* ChatApp takes the remaining space */}
      <div className="flex-1 bg-gray-400 h-screen ">
        <ChatApp />
      </div>
    </div>
  );
};

export default memo(LandingPage);
