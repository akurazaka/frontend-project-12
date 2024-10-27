import $api from '../api';

export const messagesApi = $api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '/messages',
      keepUnusedDataFor: 0,
    }),
    addMessage: builder.mutation({
      query: (msg) => ({
        url: '/messages',
        method: 'POST',
        body: msg,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ msg, id }) => ({
        url: `/messages/${id}`,
        method: 'PATCH',
        body: msg,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
