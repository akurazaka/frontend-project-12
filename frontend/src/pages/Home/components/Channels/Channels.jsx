import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';

import { setActiveChannel } from '../../../../redux/slices/channelsSlice';

import { AddChannelButton, ChannelsList } from './components';
import useSocketListeners from './hooks/useSocketListeners';

const socket = io('/');

const Channels = ({ channelsList, refetchChannels }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useSocketListeners(socket, refetchChannels);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const handleClickChannel = (name, id) => {
    dispatch(setActiveChannel(name, id));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <AddChannelButton />
      </div>
      {channelsList && (
        <ChannelsList
          channelsList={channelsList}
          activeChannelId={activeChannelId}
          handleClickChannel={handleClickChannel}
        />
      )}
    </div>
  );
};

export default Channels;
