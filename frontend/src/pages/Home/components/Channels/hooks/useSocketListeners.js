import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { setActiveChannel } from '../../../../../redux/slices/channelsSlice';

const useSocketListeners = (socket, refetchChannels) => {
  const dispatch = useDispatch();
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  useEffect(() => {
    const handleRemoveChannel = (payload) => {
      const { id } = payload;

      if (id === activeChannelId) {
        dispatch(setActiveChannel({ id: '1', name: 'general' }));
      }

      refetchChannels();
    };

    const events = ['newChannel', 'removeChannel', 'renameChannel'];

    events.forEach((event) => {
      if (event === 'removeChannel') {
        socket.on(event, handleRemoveChannel);
      } else {
        socket.on(event, refetchChannels);
      }
    });

    return () => {
      events.forEach((event) => {
        if (event === 'removeChannel') {
          socket.off(event, handleRemoveChannel);
        } else {
          socket.off(event, refetchChannels);
        }
      });
    };
  }, [socket, refetchChannels, activeChannelId, dispatch]);
};

export default useSocketListeners;
