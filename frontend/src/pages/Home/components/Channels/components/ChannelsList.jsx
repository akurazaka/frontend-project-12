import Channel from './Channel';

const ChannelsList = ({
  channelsList, activeChannelId, handleClickChannel, handleShowModal,
}) => (
  <ul
    id="channels-box"
    className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
  >
    {channelsList.map((channel) => (
      <Channel
        key={channel.id}
        channel={channel}
        activeChannelId={activeChannelId}
        handleClickChannel={handleClickChannel}
        handleShowModal={handleShowModal}
      />
    ))}
  </ul>
);

export default ChannelsList;
