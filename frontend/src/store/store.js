import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import channelReducer from './channelSlice';
import messagesReducer from './messageSlice';
import chatApi from './chatApi';

const createStore = () => configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    user: userReducer,
    channels: channelReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

export default createStore;
