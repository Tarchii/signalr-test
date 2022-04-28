import { Button } from 'react-bootstrap';
import ConnectedUsers from './ConnectedUsers';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

export default function Chat({
  messages,
  sendMessage,
  closeConnection,
  users,
}) {
  return (
    <div>
      <div className="leave-room">
        <Button variant="danger" onClick={() => closeConnection()}>
          Leave Room
        </Button>
      </div>
      <ConnectedUsers users={users} />
      <div className="chat">
        <MessageContainer messages={messages} />
        <SendMessageForm sendMessage={sendMessage} />
      </div>
    </div>
  );
}
