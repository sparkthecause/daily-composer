import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import { Link } from 'react-router';

class Editions extends React.Component {

  render() {
    const { children, data: { editions, loading, error } } = this.props;

    if (loading) {
      return <div>loading...</div>;
    }

    if (error) {
      return <div>Error!</div>;
    }

    const editionLinks = editions.map((edition) => {
      return (
        <li key={edition.id}>
          <Link to={`/editions/${edition.publishOn}`}>
            {edition.publishOn}
          </Link>
        </li>
      );
    })

    return (
      <div>
        {children ? null : <ul>{editionLinks}</ul>}
        {children}
      </div>
    );

  }

};

const EDITIONS_QUERY = gql`
  query editionsForWeekOf($begOfWeek: Date!, $endOfWeek: Date!) {
    editions(publishOnOrAfter: $begOfWeek publishOnOrBefore: $endOfWeek) {
      id
      publishOn (format: "YYYY-MM-DD")
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
