import { FC, memo } from "react";
import { Input } from "./ui/input";

type ChatappProps = {};

const Chatapp: FC<ChatappProps> = (props) => {
  return <div>
    <Input />
  </div>;
};

Chatapp.defaultProps = {};

export default memo(Chatapp);