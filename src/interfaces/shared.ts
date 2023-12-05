export type IUser = {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: {
    firstName?: string;
    lastName?: string;
  };
  role?: "seller" | "buyer" | "general_user";
  email?: string;
  password?: string;
  confirmPpassword?: string;
  image?: string;
};
