import { FC, memo } from "react";
import Login from "../components/Login";

type LoginPageProps = {};

const LoginPage: FC<LoginPageProps> = () => {
  return <div>
    <Login />
  </div>;
};


export default memo(LoginPage);