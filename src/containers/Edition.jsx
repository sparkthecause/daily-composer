import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import Header from '../components/Header';
import Blurbs from '../components/Blurbs';

class Edition extends React.Component {

  approveEdition = () => {
    const { approveEdition, edition: { id } } = this.props;
    approveEdition(id);
  }

  createEdition = () => {
    const { createEdition, params: { publishDate } } = this.props;
    createEdition(publishDate);
  }

  showInfoPanel = () => {
    alert("info");
  }

  render() {
    const { data: { loading, edition, error }, params: { publishDate } } = this.props;
    if (loading) {

      return(
        <div>
          loading...
        </div>
      );

    } else if (error) {

      return(
        <button onClick={this.createEdition}>
          CREATE NEW EDITION FOR {publishDate}
        </button>
      );

    }

    const nextDate = moment(edition.publishOn).add(1, 'day').format('YYYY-MM-DD');
    const previousDate = moment(edition.publishOn).add(1, 'day').format('YYYY-MM-DD');
    const formattedPublishDate = moment(edition.publishOn).format('ddd, MMM D')

    return(
      <div>
        <link rel="stylesheet" type="text/css" href={edition.cssHref} />
        <Header
          isApproved={Boolean(edition.approvedAt)}
          onApprove={this.approveEdition}
          onInfo={this.showInfoPanel}
          nextDate={nextDate}
          previousDate={previousDate}
          publishDate={formattedPublishDate} />
        <Blurbs blurbs={edition.blurbs} />
      </div>
    );

  }

};

Edition.propTypes = {
  approve: React.PropTypes.func.isRequired,
  createEdition: React.PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
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
      approveEdition: (editionId) => mutate({
        variables: { editionId }
      })
    })
  }),
  graphql(CREATE_MUTATION, {
    props: ({ mutate }) => ({
      createEdition: (publishDate) => mutate({
        variables: { publishDate }
      })
    })
  })
)(Edition);

// updateQueries: {
//     Comment: (prev, { mutationResult }) => {
//       const newComment = mutationResult.data.submitComment;
//       return update(prev, {
//         entry: {
//           comments: {
//             $unshift: [newComment],
//           },
//         },
//       });
//     },
//   },
