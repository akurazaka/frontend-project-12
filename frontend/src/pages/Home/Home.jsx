import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Channels, Chat } from './components';
import { useGetMessagesQuery } from '../../redux/services/messagesApi';
import { useGetChannelsQuery } from '../../redux/services/channelsApi';

import getModal from '../../shared/components/Modals/index.js';

import useSocket from './useSocket.js';
import useModal from '../../shared/hooks/useModal.js';
import useLogout from '../../shared/hooks/useLogout.js';

const Home = () => {
  const { t } = useTranslation();
  const logout = useLogout();

  useSocket();

  const { isShow, modalType, modalProps } = useModal();

  const {
    data: channelsList = [],
    refetch: refetchChannels,
    isLoading: channelsLoading,
    error: channelsError,
  } = useGetChannelsQuery();
  const {
    data: messages = [],
    refetch: refetchMessage,
    isLoading: messageLoading,
    error: messagesError,
  } = useGetMessagesQuery();

  useEffect(() => {
    if (channelsError || messagesError) {
      if (channelsError?.status === 401 || messagesError?.status === 401) {
        logout();
      }
    }
  }, [channelsError, messagesError, logout]);

  const renderModal = () => {
    if (!modalType) {
      return null;
    }

    const ModalComponent = getModal(modalType);
    return ModalComponent ? <ModalComponent isShow={isShow} modalProps={modalProps} /> : null;
  };

  if (channelsLoading || messageLoading) {
    return (
      <div className="h-100 col-12 d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">
            {t('loading')}
            ...
          </span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channelsList={channelsList} refetchChannels={refetchChannels} />
        <Chat messages={messages} refetchMessage={refetchMessage} />
        {renderModal()}
      </div>
    </div>
  );
};

export default Home;
