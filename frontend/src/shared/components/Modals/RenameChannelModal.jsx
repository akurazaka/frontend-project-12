import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Form } from 'react-bootstrap';
import { ErrorMessage, Field } from 'formik';
import { useGetChannelsQuery, useRenameChannelMutation } from '../../../redux/services/channelsApi';
import { closeModal } from '../../../redux/slices/modalsSlice';
import filterText from '../../profanityFilter';
import useModal from '../../hooks/useModal';
import ModalForm from './ModalForm';

const RenameChannelModal = ({ isShow }) => {
  const dispatch = useDispatch();
  const { handleCloseModal } = useModal();
  const { data: channelsList = [] } = useGetChannelsQuery();
  const [renameChannel] = useRenameChannelMutation();
  const modalProps = useSelector((state) => state.modals.modalProps);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.nameLengthError'))
      .max(20, t('validation.nameLengthError'))
      .test('unique-name', t('validation.channelNameExistError'), (value) => {
        const channelNames = channelsList.map((channel) => channel.name);
        return !channelNames.includes(value);
      }),
  });

  const handleSubmit = async (values, setSubmitting) => {
    try {
      const cleanName = filterText(values.name);
      await renameChannel({ newName: cleanName, id: modalProps.id }).unwrap();
      toast.success(t('channelRenamed'));
      dispatch(closeModal());
    } catch (error) {
      toast.error(t('channelRenameError'));
      console.error('Ошибка при переименовании канала', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalForm
      isShow={isShow}
      handleClose={handleCloseModal}
      title={t('renameChannel')}
      initialValues={{ name: modalProps.name }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(inputRef) => (
        <Form.Group>
          <Form.Label htmlFor="channelNameInput" className="visually-hidden">
            Имя канала
          </Form.Label>
          <Field
            name="name"
            type="text"
            id="channelNameInput"
            className="form-control"
            innerRef={inputRef}
            placeholder={t('channelName')}
          />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </Form.Group>
      )}
    </ModalForm>
  );
};

export default RenameChannelModal;
