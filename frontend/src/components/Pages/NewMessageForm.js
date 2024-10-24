import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import filter from 'leo-profanity';
import React from 'react';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import useInstance from '../../utils/axios';
import arrowRight from '../images/arrowRight.svg';

const NewMessageForm = ({ channel }) => {
  const { t } = useTranslation();
  const instance = useInstance();
  const userName = useSelector((state) => state.user.userData.username);

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={async (values, { resetForm }) => {
        const newMessage = {
          body: filter.clean(values.message),
          channelId: channel.id,
          username: userName,
        };
        try {
          await instance({
            method: 'post',
            url: routes.api.messagesPath(),
            data: newMessage,
          });
          resetForm();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
          <div className="input-group has-validation">
            <Field
              name="message"
              aria-label={t('newMessage')}
              placeholder={t('send')}
              className="border-0 p-0 ps-2 form-control"
            />
            <button type="submit" disabled={isSubmitting} className="btn btn-group-vertical">
              <img alt="arrow" className="img-fluid" src={arrowRight} />
              <span className="visually-hidden">{t('send')}</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
