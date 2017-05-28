import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { format } from 'date-fns';
import detailIcon from '../assets/icon-arrow-right-color.svg';
import Badge from './Badge';

const Container = styled.div`
  height: 50px;
  background: ${props => props.isNotCreated ? '#8E59CD' : '#FFFFFF'};
  color: ${props => props.isNotCreated ? '#FFFFFF' : '#8E59CD'};
  border: 2px solid #8E59CD;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 20px;
  display: flex;
  align-items: center;
`;

const PublishDate = styled.span`
  font-family: avenir-heavy;
  margin-right: 20px;
  min-width: 100px;
`;

const Subject = styled.span`
  color: #959595;
  margin-right: 20px;
  @media (max-width: 768px) {
    width: 350px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
	}
  @media (max-width: 320px) {
		display: none;
	}
`;

const Spacer = styled.span`
  margin: auto;
`;

const SyledImg = styled.img`
  margin-left: 10px;
`;

const DashboardRow = ({ isNotCreated, messagesBounced, messagesOpened, messagesSent, publishOn, subject }) =>
  <Link to={`/editions/${publishOn}`}>
    {isNotCreated ?
      <Container isNotCreated>
        <PublishDate>Create edition for {format(publishOn, 'ddd, MMM D')}</PublishDate>
      </Container>
    :
      <Container>
        <PublishDate>{format(publishOn, 'ddd, MMM D')}</PublishDate>
        <Subject>{subject}</Subject>
        <Spacer/>
        <Badge color="blue" value={messagesSent} />
        <Badge color="green" value={messagesOpened} />
        <Badge color="red" value={messagesBounced} />
        <SyledImg
          src={detailIcon}
          alt=">" />
      </Container>
    }
  </Link>
;


DashboardRow.propTypes = {
  messagesBounced: React.PropTypes.number,
  messagesOpened: React.PropTypes.number,
  messagesSent: React.PropTypes.number,
  publishOn: React.PropTypes.string.isRequired,
  subject: React.PropTypes.string
};

export default DashboardRow;
