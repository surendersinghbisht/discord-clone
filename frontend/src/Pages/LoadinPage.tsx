import { FC, memo } from "react";

type LoadinPageProps = {};

const LoadinPage: FC<LoadinPageProps> = () => {
  return <div className="h-screen flex justify-center items-center">
    <img src="/loadingdiscord.gif"/>
  </div>;
};


export default memo(LoadinPage);