import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Header from '../components/Header';
import Blurbs from '../components/Blurbs';

const Edition = ({ approve, create, data: { loading, edition } }) => {

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
  approve: React.PropTypes.func.isRequired,
  create: React.PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool.isRequired,
    edition: React.PropTypes.object,
  }).isRequired
};

const APPROVE_MUTATION = gql`
  mutation approveEdition($editionId: ID!) {
    approveEdition(id: $editionId) {
      id
      approvedAt
    }
  }`;

const CREATE_MUTATION = gql`
  mutation createEdition($publishDate: Date!) {
    createEdition(publishDate: $publishDate) {
      id
      publishOn
    }
  }`;

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

export default compose(
  graphql(EDITION_QUERY, {
    options: ({ params: { publishDate } }) => ({
      variables: { publishDate }
    })
  }),
  graphql(APPROVE_MUTATION, {
    props: ({ mutate }) => ({
      approve: (editionId) => mutate({
        variables: { editionId }
      })
    })
  }),
  graphql(CREATE_MUTATION, {
    props: ({ mutate }) => ({
      create: (publishDate) => mutate({
        variables: { publishDate }
      })
    })
  })
)(Edition);
