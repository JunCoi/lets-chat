import { Button, FormControl, Input } from '@material-ui/core';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [ownerUser, setOwnerUser] = useState('');

  useEffect(() => {
    setOwnerUser(prompt('Tên của bạn: '));
  }, []);

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      user: ownerUser,
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setMessages([...messages, { user: ownerUser, text: input }]);
    setInput('');
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="App">
      <Heading>Let's chat</Heading>

      <MainContainer>
        <MessagesDiv>
          {messages.map((message, index) => (
            <div key={index}>
              <Message message={message} ownerUser={ownerUser} />
              <div ref={messagesEndRef} />
            </div>
          ))}
        </MessagesDiv>

        <FormContainer>
          <InputForm>
            <Input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
            />
            <Button
              disabled={!input}
              type="submit"
              className="btn"
              onClick={sendMessage}
            >
              Gửi
            </Button>
          </InputForm>
        </FormContainer>
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.div`
  position: relative;
  border: 1px solid #444;
  width: clamp(300px, 50%, 600px);
  height: calc(100vh - 97px);
`;

const MessagesDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 46px;
  overflow: scroll;
  overflow-x: hidden;
`;

const FormContainer = styled.form`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Heading = styled.h1`
  padding: 30px 0;
`;

const InputForm = styled(FormControl)`
  display: flex !important;
  flex-direction: row !important;
  width: 100% !important;
  padding-bottom: 10px !important;

  & .input {
    flex: 1;
    color: white;
    padding: 0 20px;
  }

  & .btn {
    flex: 0;
    color: white;
    background-color: #3f51b5;

    &:hover {
      background-color: #4455b7;
    }
  }
`;

export default App;
