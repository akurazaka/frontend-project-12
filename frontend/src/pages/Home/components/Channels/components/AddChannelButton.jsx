import useModal from '../../../../../shared/hooks/useModal';
import plusButton from '../../../../../shared/assets/images/plusButton.svg';

const AddChannelButton = () => {
  const { handleOpenModal } = useModal();

  return (
    <button
      type="button"
      className="p-0 text-primary btn btn-group-vertical"
      onClick={() => handleOpenModal('add')}
    >
      <img src={plusButton} />
      <span className="visually-hidden">+</span>
    </button>
  );
};

export default AddChannelButton;
