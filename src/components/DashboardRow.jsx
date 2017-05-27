import React from 'react';
import { Link } from 'react-router';
import detailIcon from '../assets/icon-arrow-right-color.svg';
import Badge from './Badge';
import styled from 'styled-components';

const Container = styled.div`
  background: #FFFFFF;
  border: 2px solid #8E59CD;
  border-radius: 20px;
  padding: 10px 20px;
  margin: 20px;
  display: flex;
  align-items: center;
`;

const PublishDate = styled.span`
  font-family: avenir-heavy;
  color: #8E59CD;
  margin-right: 20px;
`;

const Subject = styled.span`
  color: #959595;
  margin-right: 20px;
  @media (max-width: 768px) {
		display: none;
	}
`;

const Spacer = styled.span`
  margin: auto;
`;

const StyledLink = styled(Link)`
  margin-left: 10px;
`;

const DashboardRow = ({ messagesBounced, messagesOpened, messagesSent, publishOn, subject }) => {

  return (
    <Container>
      <PublishDate>{publishOn}</PublishDate>
      <Subject>{subject}</Subject>
      <Spacer/>
      <Badge color="blue" value={messagesSent} />
      <Badge color="green" value={messagesOpened} />
      <Badge color="red" value={messagesBounced} />
      <StyledLink to={`/editions/${publishOn}`}>
        <img
          src={detailIcon}
          alt=">" />
      </StyledLink>
    </Container>
  );
};

DashboardRow.propTypes = {
  messagesBounced: React.PropTypes.number,
  messagesOpened: React.PropTypes.number,
  messagesSent: React.PropTypes.number,
  publishOn: React.PropTypes.string.isRequired,
  subject: React.PropTypes.string
};

export default DashboardRow;
