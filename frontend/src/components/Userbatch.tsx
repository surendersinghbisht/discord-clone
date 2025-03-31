import { FC, memo } from "react";

type UserbatchProps = {
    name: string,
    image?: string | undefined
};

const Userbatch: FC<UserbatchProps> = ({name, image}) => {
  return <div className="flex items-center w-full p-2 bg-customcolor hover:bg-gray-950 rounded-lg  text-white max-w-xs">
  <img src={image} alt="User" className="w-10 h-10 rounded-full object-cover mr-3" />
  <span className="text-sm font-semibold font-discord">{name}</span>
</div>

};

Userbatch.defaultProps = {};

export default memo(Userbatch);