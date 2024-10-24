import React, {
  useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup,
  Col, ListGroup,
} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import useInstance from '../../utils/axios';
import {
  selectChannelById, selectChannelNames, setChannel, updateChannels,
} from '../../store/channelSlice';
import ChatWindow from '../ChatWindow';
import { addAllMessages } from '../../store/messageSlice';
import AddButton from '../Buttons/AddButton';
import ModalAddChannel from '../Modals/ModalAddChannel';
import ModalRemoveChannel from '../Modals/ModalRemoveChannel';
import ModalChangeChannelName from '../Modals/ModalChangeChannelName';
import routes from '../../routes';

const ChatPage = () => {
  const { t } = useTranslation();
  const instance = useInstance();
  const channelId = useSelector((state) => state.channels.channelId);
  const [modalInfo, setModalInfo] = useState({ type: null, channelId: null });
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.data);
  const existingNames = useSelector(selectChannelNames);
  const selectedChannel = useSelector((state) => selectChannelById(state, channelId));

  const handleModalOpen = (type, id = null) => {
    setModalInfo({ type, channelId: id });
  };

  const handleModalClose = () => {
    setModalInfo({ type: null, channelId: null });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [channelsResponse, messagesResponse] = await Promise.all([
          instance({ method: 'get', url: routes.api.channelsPath() }),
          instance({ method: 'get', url: routes.api.messagesPath() }),
        ]);
        dispatch(updateChannels(channelsResponse.data));
        dispatch(addAllMessages(messagesResponse.data));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [dispatch, instance]);

  return (
    <div className="h-100 p-5">
      <div className="container overflow-hidden rounded shadow d-flex flex-column h-100">
        <div className="row h-100 bg-white flex-md-row">
          <Col sm={4} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels')}</b>
              <AddButton onClick={() => handleModalOpen('add')} />
            </div>
            <ListGroup variant="flush">
              {channels.map((channel) => (
                <ListGroup.Item variant="light" key={channel.id}>
                  <ButtonGroup className="w-100">
                    <Button
                      className="w-100 rounded-0 text-start text-truncate"
                      variant={channel.id === channelId ? 'secondary' : 'light'}
                      name={filter.clean(channel.name)}
                      onClick={() => dispatch(setChannel(channel.id))}
                    >
                      {'# '}
                      {filter.clean(channel.name)}
                    </Button>

                    {channel.removable ? (
                      <Dropdown>
                        <Dropdown.Toggle
                          split
                          className="class=flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary"
                          variant={channel.id === channelId ? 'secondary' : 'light'}
                          style={{ borderRadius: '0px 8px 8px 0px' }}
                        >
                          <span className="visually-hidden">{t('make')}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="1" onClick={() => handleModalOpen('remove', channel.id)}>
                            {t('delete')}
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="2" onClick={() => handleModalOpen('rename', channel.id)}>
                            {t('rename')}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : null}
                  </ButtonGroup>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8} className="col p-0 h-100">
            {selectedChannel && <ChatWindow channel={selectedChannel} />}
          </Col>
        </div>

        {modalInfo.type === 'add' && (
          <ModalAddChannel
            t={t}
            show
            onHide={handleModalClose}
            existingChannelNames={existingNames}
          />
        )}

        {modalInfo.type === 'remove' && (
          <ModalRemoveChannel
            t={t}
            show
            onHide={handleModalClose}
            channelId={modalInfo.channelId}
          />
        )}

        {modalInfo.type === 'rename' && (
          <ModalChangeChannelName
            t={t}
            show
            onHide={handleModalClose}
            channelId={modalInfo.channelId}
            existingChannelNames={existingNames}
          />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
