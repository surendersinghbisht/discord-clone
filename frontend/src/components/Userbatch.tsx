import { FC, memo } from "react";

type UserbatchProps = {
  name: string;
  image?: string | undefined;
  icon?: React.ReactNode;
};

const Userbatch: FC<UserbatchProps> = ({ name, image, icon }) => {
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
      {icon && (
        <span className="ml-auto flex-shrink-0">
          <button>{icon}</button>
        </span>
      )}
    </div>
  );
};

Userbatch.defaultProps = {
  image: "",
  icon: null,
};

export default memo(Userbatch);
