import { FC, memo, useState } from "react";

type CreateGroupProps = {};

const CreateGroup: FC<CreateGroupProps> = (props) => {

    const[isEditing, setIsEditing] = useState(false);

  return <div>

  </div>;
};

CreateGroup.defaultProps = {};

export default memo(CreateGroup);