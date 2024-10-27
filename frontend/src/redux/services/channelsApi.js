import $api from '../api';

export const channelsApi = $api.injectEndpoints({
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '/channels',
      keepUnusedDataFor: 0,
    }),
    addChannel: builder.mutation({
      query: (channelName) => ({
        url: '/channels',
        method: 'POST',
        body: { name: channelName },
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ newName, id }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name: newName },
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
        body: {},
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
