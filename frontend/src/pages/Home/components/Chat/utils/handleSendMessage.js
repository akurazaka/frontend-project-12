import { toast } from 'react-toastify';
import filterText from '../../../../../shared/profanityFilter';

const handleSendMessage = async (e, input, setInput, addMessage, activeChannel, username, t) => {
  e.preventDefault();

  const cleanInput = filterText(input);
  const newMessage = { body: cleanInput, channelId: activeChannel.activeChannelId, username };

  try {
    await addMessage(newMessage).unwrap();
    setInput('');
  } catch (error) {
    toast.error(t('messageSendError'));
    console.error('Ошибка отправки сообщения:', error);
  }
};

export default handleSendMessage;
