import AddChannelModal from './AddChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  add: AddChannelModal,
  rename: RenameChannelModal,
  delete: DeleteChannelModal,
};

export default (modalName) => modals[modalName];
