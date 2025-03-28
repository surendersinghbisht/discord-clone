import { FC, memo } from "react";
import Login from "../components/Login";

type LoginPageProps = {};

const LoginPage: FC<LoginPageProps> = (props) => {
  return <div>
    <Login />
  </div>;
};

LoginPage.defaultProps = {};

export default memo(LoginPage);