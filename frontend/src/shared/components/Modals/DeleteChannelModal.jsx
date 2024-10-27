import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetMessagesQuery, useRemoveMessageMutation } from '../../../redux/services/messagesApi';
import { useRemoveChannelMutation } from '../../../redux/services/channelsApi';
import useModal from '../../hooks/useModal';
import ModalForm from './ModalForm';

const DeleteChannelModal = ({ isShow }) => {
  const { handleCloseModal, modalProps } = useModal();
  const { data: messages } = useGetMessagesQuery();
  const [removeChannel] = useRemoveChannelMutation();
  const [removeMessage] = useRemoveMessageMutation();
  const { t } = useTranslation();

  const handleSubmit = async (setSubmitting) => {
    try {
      const messagesToBeRemoved = messages.filter((message) => message.channelId === modalProps.id);

      await removeChannel(modalProps.id).unwrap();

      const deletePromises = messagesToBeRemoved.map((message) => removeMessage(message.id));
      await Promise.all(deletePromises);

      toast.success(t('channelRemoved'));
      handleCloseModal();
    } catch (error) {
      toast.error(t('channelRemoveError'));
      console.error('Ошибка при удалении канала', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalForm
      isShow={isShow}
      handleClose={handleCloseModal}
      title={t('removeChannel')}
      initialValues={{}}
      onSubmit={handleSubmit}
      isRemove
    >
      {() => (
        <p>
          {t('sureYouWantToDelete')}
          ?
        </p>
      )}
    </ModalForm>
  );
};

export default DeleteChannelModal;
