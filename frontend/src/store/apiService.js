import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../routes';

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: routes.api.basePath }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => routes.api.channelsPath(),
    }),
    getMessages: builder.query({
      query: () => routes.api.messagesPath(),
    }),
  }),
});

export const { useGetChannelsQuery, useGetMessagesQuery } = apiService;
