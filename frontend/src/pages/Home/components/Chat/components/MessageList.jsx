import { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-messages overflow-auto px-5" id="messages-box">
      {messages.map((msg, index) => (
        <div className="text-break mb-2" key={msg.id}>
          <b>{msg.username}</b>
          {': '}
          {msg.body}
          {index === messages.length - 1 && <div ref={messagesEndRef} />}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
