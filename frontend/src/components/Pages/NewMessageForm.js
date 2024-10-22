import { useTranslation } from 'react-i18next';
import { Field, Form, Formik } from 'formik';
import filter from 'leo-profanity';
import React from 'react';
import { useSelector } from 'react-redux';
import routes from '../../routes';
import useInstance from '../../utils/axios';

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                />
              </svg>
              <span className="visually-hidden">{t('send')}</span>
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
