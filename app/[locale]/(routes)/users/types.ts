export interface usersEntity {
  id: number;
  name: string;
  email: string;
  address: string;
  role: {
    id: number;
    name: string;
  };
  avatar: string;}
