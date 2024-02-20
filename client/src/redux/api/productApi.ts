// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { productResponse } from "../../types/api-types";
// import axios from "axios";

// Define a service using a base URL and expected endpoints
export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
      latestProducts: builder.query<productResponse, string>({
        query: () => "latest",
        providesTags: ["product"],
      }),
  }),
});


export const { useLatestProductsQuery } = productAPI;
