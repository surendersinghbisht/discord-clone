import { FC, memo } from "react";
import { Outlet } from "react-router-dom";

type LayoutProps = {};

const Layout: FC<LayoutProps> = () => {
  return <>
  Layout
  <Outlet />
  </>;
};


export default memo(Layout);