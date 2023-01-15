import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoStatsHeaders = {
  // CoinCapApiKEY: "56f884ca-12fc-47ff-ba05-e099a55ee503",
  "X-CoinAPI-Key": "63C5CF87-E1AE-411F-BBCE-20FE92D34400",
};

const baseUrl = "https://rest.coinapi.io/v1";

const createRequest = (url) => ({
  url,
  headers: cryptoStatsHeaders,
});

export const cryptoStatsApi = createApi({
  reducerPath: "cryptoStatsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoStats: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
  }),
});

export const { useGetCryptoStatsQuery } = cryptoStatsApi;
