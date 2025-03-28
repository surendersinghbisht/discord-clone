export interface IUser {
    _id: string;
    name: string;
    username: string;
    email: string;
    password?: string;
    image?: string;
    bio?: string;
    location?: string;
    friends: string[]; 
    inGroups: string[];
    createdAt: string;
    updatedAt: string;
  }