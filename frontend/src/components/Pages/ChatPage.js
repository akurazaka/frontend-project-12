import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, ListGroup, ButtonGroup, Dropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { apiService, useGetChannelsQuery, useGetMessagesQuery } from '../../store/apiService';
import {
  setChannel, toggleModalAdd, toggleModalDelete, toggleModalChange,
} from '../../store/channelSlice';
import ChatWindow from '../ChatWindow';
import AddButton from '../Buttons/AddButton';
import ModalAddChannel from '../Modals/ModalAddChannel';
import ModalRemoveChannel from '../Modals/ModalRemoveChannel';
import ModalChangeChannelName from '../Modals/ModalChangeChannelName';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.channelId);
  const showModal = useSelector((state) => state.channels.showModalAdd);
  const showModalDelete = useSelector((state) => state.channels.showModalDelete);
  const showModalChange = useSelector((state) => state.channels.showModalChange);
  const { data: channels = [] } = useGetChannelsQuery();
  const { data: messages = [] } = useGetMessagesQuery();

  return (
    <div className="h-100 p-5">
      <div className="container overflow-hidden rounded shadow d-flex flex-column h-100">
        <div className="row h-100 bg-white flex-md-row">
          <Col sm={4} className="col-4 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>{t('channels')}</b>
              <AddButton onClick={() => dispatch(toggleModalAdd(true))} />
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
                          className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary"
                          variant={channel.id === channelId ? 'secondary' : 'light'}
                          style={{ borderRadius: '0px 8px 8px 0px' }}
                        >
                          <span className="visually-hidden">{t('make')}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="1" onClick={() => dispatch(toggleModalDelete(channel.id))}>
                            {t('delete')}
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="1" onClick={() => dispatch(toggleModalChange(channel.id))}>
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
            <ChatWindow channelId={channelId} />
          </Col>
        </div>
        <ModalAddChannel
          t={t}
          show={showModal}
          onHide={() => dispatch(toggleModalAdd(false))}
        />
        <ModalRemoveChannel
          t={t}
          show={showModalDelete}
          onHide={() => dispatch(toggleModalDelete(null))}
        />
        <ModalChangeChannelName
          t={t}
          show={showModalChange}
          onHide={() => dispatch(toggleModalChange(null))}
        />
      </div>
    </div>
  );
};

export default ChatPage;
