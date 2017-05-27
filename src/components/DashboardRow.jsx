import React from 'react';
import { Link } from 'react-router';
import detailIcon from '../assets/icon-arrow-right-color.svg';
import Badge from './Badge';

const DashboardRow = ({ messagesBounced, messagesOpened, messagesSent, publishOn, subject }) => {

  return (
    <div>
      <span>{publishOn}</span>
      <span>{subject}</span>
      <Badge color="blue" size="medium" value={messagesSent} />
      <Badge color="green" size="medium" value={messagesOpened} />
      <Badge color="red" size="medium" value={messagesBounced} />
      <Link to={`/editions/${publishOn}`}>
        <img
          src={detailIcon}
          alt=">" />
      </Link>
    </div>
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
