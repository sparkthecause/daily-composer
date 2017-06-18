import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { addWeeks, eachDay, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import DashboardHeader from '../components/DashboardHeader';
import DashboardRow from '../components/DashboardRow';

class Editions extends React.Component {

  render() {
    const { children, data: { editions, loading, error }, location: { query: { weekOf } } } = this.props;

    const date = weekOf || new Date();

    if (loading) {
      return <div>loading...</div>;
    }

    if (error) {
      return <div>Error!</div>;
    }

    const startWeek = startOfWeek(date);
    const endWeek = endOfWeek(date);
    const headerTitle = `${format(startWeek, 'MMM D')} - ${format(endWeek, 'MMM D')}`;
    const dates = eachDay(startWeek, endWeek).map(date => format(date, 'YYYY-MM-DD'));

    const rows = dates.map(date => {
      const isoDate = format(date, 'YYYY-MM-DD');
      const edition = editions.find(({ publishOn }) => publishOn === isoDate);
      return { publishOn: isoDate, edition };
    });

    const editionRows = rows.map(row =>
      <DashboardRow
        key={row.publishOn}
        isNotCreated={!Boolean(row.edition)}
        messagesBounced={row.edition && row.edition.messagesBounced}
        messagesOpened={row.edition && row.edition.messagesOpened}
        messagesSent={row.edition && row.edition.messagesSent}
        publishOn={row.publishOn}
        subject={row.edition && row.edition.subject} />
    );
    const Dashboard = (
      <div>
        <DashboardHeader
          nextDate={format(addWeeks(date, 1), 'YYYY-MM-DD')}
          previousDate={format(subWeeks(date, 1), 'YYYY-MM-DD')}
          title={headerTitle} />
        {editionRows}
      </div>
    );

    return (
      <div>
        {children ? children : Dashboard}
      </div>
    );

  }

};

const EDITIONS_QUERY = gql`
  query editionsFordate($begOfWeek: Date!, $endOfWeek: Date!) {
    editions(publishOnOrAfter: $begOfWeek publishOnOrBefore: $endOfWeek) {
      id
      publishOn (format: "YYYY-MM-DD")
      subject
      messagesBounced
      messagesOpened
      messagesSent
    }
  }`;

export default compose(
  graphql(EDITIONS_QUERY, {
    options: ({ location: { query: { weekOf } } }) => ({
      variables: {
        begOfWeek: format(startOfWeek(weekOf || new Date()), 'YYYY-MM-DD'),
        endOfWeek: format(endOfWeek(weekOf || new Date()), 'YYYY-MM-DD')
      }
    })
  })
)(Editions);
