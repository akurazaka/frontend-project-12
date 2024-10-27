import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import arrowRight from '../../../../../shared/assets/images/arrowRight.svg';

const MessageInput = ({ input, setInput, handleSendMessage }) => {
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannelId]);

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            value={input}
          />
          <button
            type="submit"
            disabled={!input}
            className="btn btn-group-vertical"
            onClick={(e) => handleSendMessage(e)}
          >
            <img src={arrowRight} alt="send" />
            <span className="visually-hidden">{t('send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
