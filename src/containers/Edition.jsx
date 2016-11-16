import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import Header from '../components/Header';
import Blurbs from '../components/Blurbs';

const Edition = ({ data: { loading, edition } }) => {

  console.log(loading, edition);

  if (loading) return(
    <div>
      loading...
    </div>
  );

  if (edition) {
    const onApprove = () => alert("approve"); // TODO: Toggle approved state
    const onInfo = () => alert("info"); // TODO: Toggle info menu
    const onNext = () => alert("next"); // TODO: Navigate to next date
    const onPrevious = () => alert("previous"); // TODO: Navigate to prev date

    return(
      <div>
        <link rel="stylesheet" type="text/css" href={edition.cssHref} />
        <Header
          isApproved={Boolean(edition.approvedAt)}
          onApprove={onApprove}
          onInfo={onInfo}
          onNext={onNext}
          onPrevious={onPrevious}
          publishDate={edition.publishOn} />
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
  query currentEdition($editionId: ID!) {
    edition(id: $editionId) {
      approvedAt
      publishOn(format: "MM/DD/YYYY")
      cssHref
      blurbs {
        id
        type
        data
      }
    }
  }`;

const withData = graphql(EDITION_QUERY, {
  options: ({params}) => ({
    variables: {
      editionId: params.editionId
    }
  })
});

export default withData(Edition);
