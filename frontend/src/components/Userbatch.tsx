import { FC, memo } from "react";

type UserbatchProps = {
  name: string;
  image?: string | undefined;
  icon?: React.ReactNode;
  icon2?: React.ReactNode;
};

const Userbatch: FC<UserbatchProps> = ({ name, image, icon, icon2 }) => {
  return (
    <div className="flex items-center w-full p-4 bg-customcolor hover:bg-gray-950 rounded-lg text-white max-w-xs">
     {image ? <img
        src={image}
        className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0" 
      /> : 
      <img
        src="/user.jpg"
        className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0" 
      />
      }
      
      <span className="text-sm font-semibold font-discord  ">{name}</span>
      <div className="flex ml-auto space-x-4">
      {icon && (
        <span className=" flex-shrink-0">
          <button>{icon}</button>
        </span>
      )}
      {icon2 && (
        <span className="">
          <button>{icon2}</button>
        </span>
      )}
      </div>
    </div>
  );
};

export default memo(Userbatch);
