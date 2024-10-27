import { Modal, Button } from 'react-bootstrap';
import {
  Formik, Form as FormikForm,
} from 'formik';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ModalForm = ({
  isShow,
  handleClose,
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
  isRemove,
}) => {
  const { t } = useTranslation();

  console.log(isRemove);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isShow && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShow]);

  return (
    <Modal show={isShow} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit: formikSubmit }) => (
            <FormikForm
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  formikSubmit();
                }
              }}
              onSubmit={formikSubmit}
            >
              {children(inputRef)}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t('cancel')}
                </Button>
                <Button variant={isRemove ? 'danger' : 'primary'} type="submit">
                  {isRemove ? t('delete') : t('send')}
                </Button>
              </Modal.Footer>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
