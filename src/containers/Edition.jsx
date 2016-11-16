import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Header from '../components/Header';
import Blurbs from '../components/Blurbs';

const Edition = ({ approve, data: { loading, edition } }) => {

  if (loading) return(
    <div>
      loading...
    </div>
  );

  if (edition) {
    const onApprove = () => approve(edition.id);
    const onInfo = () => alert("info"); // TODO: Toggle info menu
    const nextDate = moment(edition.publishOn).add(1, 'day').format('YYYY-MM-DD');
    const previousDate = moment(edition.publishOn).add(1, 'day').format('YYYY-MM-DD');
    const publishDate = moment(edition.publishOn).format('ddd, MMM D')

    return(
      <div>
        <link rel="stylesheet" type="text/css" href={edition.cssHref} />
        <Header
          isApproved={Boolean(edition.approvedAt)}
          onApprove={onApprove}
          onInfo={onInfo}
          nextDate={nextDate}
          previousDate={previousDate}
          publishDate={publishDate} />
        <Blurbs blurbs={edition.blurbs} />
      </div>
    );
  };
};

Edition.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    edition: React.PropTypes.object,
  }).isRequired
};

const EDITION_QUERY = gql`
  query currentEdition($publishDate: Date!) {
    edition(publishDate: $publishDate) {
      id
      approvedAt
      publishOn
      cssHref
      blurbs {
        id
        type
        data
      }
    }
  }`;

const APPROVE_MUTATION = gql`
  mutation approveEdition($editionId: ID!) {
    approveEdition(id: $editionId) {
      id
      approvedAt
    }
  }`;

const withData = graphql(EDITION_QUERY, {
  options: ({ params: { publishDate } }) => ({
    variables: { publishDate }
  })
});

const withMutations = graphql(APPROVE_MUTATION, {
  props: ({ mutate }) => ({
    approve: (editionId) => mutate({
      variables: { editionId }
    }),
  }),
});

export default withMutations(withData(Edition));
