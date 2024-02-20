// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, NewUser, UserResponse, registerUser } from "../../types/api-types";
import axios from "axios";
// import { server } from '../store'

// Define a service using a base URL and expected endpoints
export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, NewUser>({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
    register: builder.mutation<MessageResponse, registerUser>({
      query: (data) => ({
        url: "new",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["users"],
    })
  }),
});

export const getUser = async (id: string) => {
  try {
    const data:{data:UserResponse} = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = userAPI;
