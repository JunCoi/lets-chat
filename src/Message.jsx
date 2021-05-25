import styled from 'styled-components';
import React from 'react';

const Message = (props) => {
  const { message, ownerUser } = props;

  return (
    <MessageDiv
      className={ownerUser === message.user ? 'ownerUser' : 'otherUsers'}
    >
      <FlexDiv>
        {!(ownerUser === message.user) && (
          <h5>{message.user || 'Unknow User'}</h5>
        )}
        <TextBlock className={ownerUser === message.user && 'ownerMessage'}>
          {message.text}
        </TextBlock>
      </FlexDiv>
    </MessageDiv>
  );
};

const MessageDiv = styled.div`
  display: flex;
  padding: 5px 10px;

  &.ownerUser {
    text-align: right;
    justify-content: flex-end;
  }

  &.otherUsers {
    text-align: left;
    justify-content: flex-start;
  }
`;

const FlexDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const TextBlock = styled.div`
  background-color: #3a3b3c;
  padding: 5px 10px;
  margin: 4px 0;
  border-radius: 8px;

  &.ownerMessage {
    background-color: #3f51b5;
  }
`;

export default Message;
