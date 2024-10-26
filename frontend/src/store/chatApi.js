import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Messages', 'Users'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (channelId) => `messages/${channelId}`,
      providesTags: (result) =>
        result ? [{ type: 'Messages', id: result.channelId }] : [],
    }),
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Messages'],
    }),
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetUsersQuery,
} = chatApi;
