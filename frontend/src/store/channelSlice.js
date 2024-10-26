/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = '1';

const initialState = { 
  data: [], 
  channelId: DEFAULT_CHANNEL_ID,
  showModalAdd: false,
  showModalDelete: null,
  showModalChange: null,
};

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateChannels: (state, action) => {
      state.data = action.payload;
    },
    addChannel: (state, action) => {
      const isChannelExist = state.data.some((item) => item.id === action.payload.id);
      if (!isChannelExist) {
        state.data.push(action.payload);
      }
    },
    removeChannel: (state, action) => {
      state.data = state.data.filter((channel) => channel.id !== action.payload);
      if (state.channelId === action.payload) {
        state.channelId = DEFAULT_CHANNEL_ID;
      }
    },
    editChannel: (state, action) => {
      const elIndex = state.data.findIndex((item) => item.id === action.payload.id);
      state.data[elIndex] = action.payload;
    },
    setChannel: (state, action) => {
      state.channelId = action.payload;
    },
    toggleModalAdd: (state, action) => {
      state.showModalAdd = action.payload;
    },
    toggleModalDelete: (state, action) => {
      state.showModalDelete = action.payload;
    },
    toggleModalChange: (state, action) => {
      state.showModalChange = action.payload;
    },
  },
});

export const selectChannelNames = createSelector(
  (state) => state.channels.data,
  (channels) => channels.map((channel) => channel.name),
);

export const selectChannelById = createSelector(
  (state) => state.channels.data,
  (_, channelId) => channelId,
  (channels, channelId) => channels.find((item) => item.id === channelId),
);

export const {
  updateChannels, addChannel, removeChannel, setChannel, editChannel,
  toggleModalAdd, toggleModalDelete, toggleModalChange,
} = channelSlice.actions;

export default channelSlice.reducer;
