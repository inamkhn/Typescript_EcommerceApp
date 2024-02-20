import { Product, User } from "./types";

export interface NewUser {
  _id: string;
  name: string | null;
  photo: string | null;
  stock: number
  price: number;
}

export interface registerUser {
  name: string | null;
  email: string | null;
  password:string | null;
  gender: string;
  dob: string;
  photo: string;

}

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type productResponse = {
  product: Product[];
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};
