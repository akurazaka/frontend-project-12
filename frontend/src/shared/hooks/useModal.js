import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../redux/slices/modalsSlice';

const useModal = () => {
  const dispatch = useDispatch();
  const isShow = useSelector((state) => state.modals.isShow);
  const modalType = useSelector((state) => state.modals.modalType);
  const modalProps = useSelector((state) => state.modals.modalProps);

  const handleOpenModal = (type, props) => {
    dispatch(openModal({ modalType: type, modalProps: props }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    handleOpenModal, handleCloseModal, isShow, modalType, modalProps,
  };
};

export default useModal;
