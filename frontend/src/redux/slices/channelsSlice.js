import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../services/channelsApi';

const initialState = {
  activeChannelId: '1',
  activeChannelName: 'general',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => ({
      ...state,
      activeChannelId: payload.id,
      activeChannelName: payload.name,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        activeChannelId: payload.id,
        activeChannelName: payload.name,
      }),
    );
  },
});

export const { setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
