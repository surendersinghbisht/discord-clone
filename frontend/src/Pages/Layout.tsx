import { FC, memo } from "react";
import { Outlet } from "react-router-dom";

type LayoutProps = {};

const Layout: FC<LayoutProps> = (props) => {
  return <>
  Layout
  <Outlet />
  </>;
};

Layout.defaultProps = {};

export default memo(Layout);