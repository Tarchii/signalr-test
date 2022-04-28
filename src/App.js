import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './components/Chat';
import Lobby from './components/Lobby';
import ModalError from './components/ModalError';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import FramerMotionContainer from './components/FramerMotionContainer';
import { motion } from 'framer-motion';

const backURL =
  'https://19bd-2803-9800-b442-81b9-7025-7d64-cadd-f5a0.sa.ngrok.io/chat';

export default function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(backURL)
        .configureLogging(LogLevel.Information)
        .build();
      console.log(connection);

      connection.on('UsersInRoom', (users) => {
        setUsers(users);
      });

      connection.on('ReceiveMessage', (user, message) => {
        console.log('message received: ', message);
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.onclose((e) => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke('JoinRoom', { user, room });
      setConnection(connection);
    } catch (e) {
      console.error('Error: ', e);
      setConnection(false);
      handleShow();
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke('SendMessage', message);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  return (
    <FramerMotionContainer>
      <div className="app">
        <motion.h2
          animate={{ fontSize: '100px', color: 'green' }}
          transition={{ delay: 0.1 }}
        >
          MyChat
        </motion.h2>
        <hr />
        {!connection ? (
          <div>
            <ModalError show={show} handleShow={handleShow} />
            <Lobby joinRoom={joinRoom} />
          </div>
        ) : (
          <Chat
            messages={messages}
            sendMessage={sendMessage}
            closeConnection={closeConnection}
            users={users}
          />
        )}
      </div>
    </FramerMotionContainer>
  );
}

// https://www.youtube.com/watch?v=nEQvA5HfEDE - MIN 33:05
