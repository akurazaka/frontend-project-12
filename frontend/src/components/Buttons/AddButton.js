/* eslint-disable max-len */
import plusButton from '../images/plusButton.svg';

const AddButton = ({ onClick }) => (
  <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={onClick}>
    <img alt="add" className="img-fluid" src={plusButton} />
    <span className="visually-hidden">+</span>
  </button>
);
export default AddButton;
