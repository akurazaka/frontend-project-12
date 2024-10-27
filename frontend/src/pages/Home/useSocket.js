import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useSocket = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const socket = io('/');

    socket.on('connect', () => {
      toast.success(t('connectionEstablished'));
    });

    socket.on('disconnect', (reason) => {
      toast.error(`${t('connectionLost')}: ${reason}`);
    });

    socket.on('reconnect_attempt', (attemptNumber) => {
      toast.info(`${t('reconnectAtt')}: #${attemptNumber}`);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('reconnect_attempt');
    };
  }, [t]);

  return null;
};

export default useSocket;
