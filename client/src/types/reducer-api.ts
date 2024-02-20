import { User } from "./types";

export interface initial{
    user: User | null;
    loading: boolean;
    error:string | null
}