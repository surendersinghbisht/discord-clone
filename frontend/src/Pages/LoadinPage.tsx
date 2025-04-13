import { FC, memo } from "react";

type LoadinPageProps = {};

const LoadinPage: FC<LoadinPageProps> = (props) => {
  return <div className="h-screen flex justify-center items-center">
    <img src="/loadingdiscord.gif"/>
  </div>;
};

LoadinPage.defaultProps = {};

export default memo(LoadinPage);