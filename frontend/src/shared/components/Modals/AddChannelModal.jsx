import { Form } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useAddChannelMutation, useGetChannelsQuery } from '../../../redux/services/channelsApi';

import filterText from '../../profanityFilter';
import useModal from '../../hooks/useModal';
import ModalForm from './ModalForm';

const AddChannelModal = ({ isShow }) => {
  const { handleCloseModal } = useModal();

  const { data: channelsList = [] } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();

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
      await addChannel(cleanName).unwrap();
      toast.success(t('channelCreated'));

      handleCloseModal();
    } catch (error) {
      toast.error(t('channelCreateError'));
      console.error('Ошибка при добавлении канала', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalForm
      isShow={isShow}
      handleClose={handleCloseModal}
      title={t('addChannel')}
      initialValues={{ name: '' }}
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
            placeholder="Имя канала"
          />
          <ErrorMessage name="name" component="div" className="text-danger" />
        </Form.Group>
      )}
    </ModalForm>
  );
};
export default AddChannelModal;
