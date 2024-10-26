import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonGroup, Col, ListGroup, Dropdown, Button, Spinner, Alert,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import useInstance from '../../utils/axios';
import {
  selectChannelById, selectChannelNames, setChannel, updateChannels,
  toggleModalAdd, toggleModalDelete, toggleModalChange,
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
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.channelId);
  const showModal = useSelector((state) => state.channels.showModalAdd);
  const showModalDelete = useSelector((state) => state.channels.showModalDelete);
  const showModalChange = useSelector((state) => state.channels.showModalChange);
  const channels = useSelector((state) => state.channels.data);
  const existingNames = useSelector(selectChannelNames);
  const selectedChannel = useSelector((state) => selectChannelById(state, channelId));

  // Добавлено состояние для отслеживания загрузки и ошибок
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Начинаем загрузку
      try {
        // Увеличьте задержку перед началом загрузки данных
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const [channelsResponse, messagesResponse] = await Promise.all([
          instance({ method: 'get', url: routes.api.channelsPath() }),
          instance({ method: 'get', url: routes.api.messagesPath() }),
        ]);

        dispatch(updateChannels(channelsResponse.data));
        dispatch(addAllMessages(messagesResponse.data));
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(t('error.fetchData')); // Отобразить ошибку
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };
    
    fetchData();
  }, [dispatch, instance, t]);

  return (
    <div className="h-100 p-5">
      <div className="container overflow-hidden rounded shadow d-flex flex-column h-100">
        {loading && (
          <Spinner animation="border" role="status" className="m-auto">
            <span className="visually-hidden">{t('loading')}</span>
          </Spinner>
        )}
        {error && (
          <Alert variant="danger" className="m-2">
            {error}
          </Alert>
        )}
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
            {selectedChannel && <ChatWindow channel={selectedChannel} />}
          </Col>
        </div>
        <ModalAddChannel
          t={t}
          show={showModal}
          onHide={() => dispatch(toggleModalAdd(false))}
          existingChannelNames={existingNames}
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
          existingChannelNames={existingNames}
        />
      </div>
    </div>
  );
};

export default ChatPage;
