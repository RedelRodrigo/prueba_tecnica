import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => `/pokemon?limit=151`,
    }),
    getPokemon: builder.query({
      query: (id) => `/pokemon/${id}`,
    }),
  }),
});

export const { useGetItemsQuery, useGetPokemonQuery } = api;
