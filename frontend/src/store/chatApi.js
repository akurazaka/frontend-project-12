/* eslint-disable no-param-reassign */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logOut } from './userSlice';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: '/api/v1',
    timeout: 5000,
  });

  instance.interceptors.request.use((config) => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    if (userData) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const dispatch = useDispatch();
      const { status } = error.response || {};
      const { t } = useTranslation();

      if (status === 401) {
        toast.error(t('unauthorizedAccess'), {
          position: 'top-right',
        });
        localStorage.removeItem('user_data');
        dispatch(logOut());
      } else {
        toast.error(t('unknownError'), {
          position: 'top-right',
        });
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const instance = createAxiosInstance();

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    fetchFn: (url, options) => instance({ url, ...options }),
  }),
  tagTypes: ['Messages', 'Users'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (channelId) => `messages/${channelId}`,
      providesTags: (result) => (result ? [{ type: 'Messages', id: result.channelId }] : []),
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

export default chatApi;
