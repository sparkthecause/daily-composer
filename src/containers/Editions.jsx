import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import DashboardHeader from '../components/DashboardHeader';
import DashboardRow from '../components/DashboardRow';

class Editions extends React.Component {

  render() {
    const { children, data: { editions, loading, error }, location: { query: { weekOf } } } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }

    if (error) {
      return <div>Error!</div>;
    }

    const startOfWeek = moment.utc(weekOf).startOf('isoWeek');
    const endOfWeek = moment.utc(weekOf).endOf('isoWeek');
    const headerTitle = `${startOfWeek.format('MMM D')} - ${endOfWeek.format('MMM D')}`;
    const editionRows = editions.map((edition) =>
      <DashboardRow
        key={edition.id}
        messagesBounced={1}
        messagesOpened={2}
        messagesSent={3}
        publishOn={edition.publishOn}
        subject={edition.subject} />
    );
    const Dashboard = (
      <div>
        <DashboardHeader
          nextDate={endOfWeek.add(1, 'days').format('YYYY-MM-DD')}
          previousDate={startOfWeek.subtract(1, 'days').format('YYYY-MM-DD')}
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
  query editionsForWeekOf($begOfWeek: Date!, $endOfWeek: Date!) {
    editions(publishOnOrAfter: $begOfWeek publishOnOrBefore: $endOfWeek) {
      id
      publishOn (format: "YYYY-MM-DD")
      subject
    }
  }`;

export default compose(
  graphql(EDITIONS_QUERY, {
    options: ({ location: { query: { weekOf } } }) => ({
      variables: {
        begOfWeek: moment.utc(weekOf).startOf('isoWeek').format('YYYY-MM-DD'),
        endOfWeek: moment.utc(weekOf).endOf('isoWeek').format('YYYY-MM-DD')
      }
    })
  })
)(Editions);
