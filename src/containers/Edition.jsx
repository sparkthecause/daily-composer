import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import update from 'react-addons-update';
import Header from '../components/Header';
import Blurbs from '../components/Blurbs';

class Edition extends React.Component {

  approveEdition = () => {
    const { approveEdition, data: { edition: { id } } } = this.props;
    approveEdition(id);
  }

  createEdition = () => {
    const { createEdition, params: { publishDate } } = this.props;
    createEdition(publishDate);
  }

  createBlurb = () => {
    const { createBlurb, data: { edition: { id } } } = this.props;
    createBlurb(id);
  }

  showInfoPanel = () => {
    alert("info");
  }

  render() {
    const { data: { loading, edition, error }, params: { publishDate } } = this.props;

    const nextDate = moment(publishDate).add(1, 'day').format('YYYY-MM-DD');
    const previousDate = moment(publishDate).subtract(1, 'day').format('YYYY-MM-DD');
    const formattedPublishDate = moment(publishDate).format('ddd, MMM D');

    if (loading) {

      return(
        <div>
          <Header
          onInfo={this.showInfoPanel}
          nextDate={nextDate}
          previousDate={previousDate}
          publishDate={formattedPublishDate} />
          <span> loading... </span>
        </div>
      );

    } else if (error) {

      return(
        <div>
          <Header
          onInfo={this.showInfoPanel}
          nextDate={nextDate}
          previousDate={previousDate}
          publishDate={formattedPublishDate} />
          <button onClick={this.createEdition}>
            CREATE NEW EDITION FOR {publishDate}
          </button>
        </div>

      );

    }

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
        <Blurbs
          blurbs={edition.blurbs}
          onAddBlurb={this.createBlurb} />
      </div>
    );

  }

};

Edition.propTypes = {
  approveEdition: React.PropTypes.func.isRequired,
  createBlurb: React.PropTypes.func.isRequired,
  createEdition: React.PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    edition: React.PropTypes.object,
  }).isRequired
};

const APPROVE_EDITION_MUTATION = gql`
  mutation approveEdition($editionId: ID!) {
    approveEdition(id: $editionId) {
      id
      approvedAt
    }
  }`;

const CREATE_EDITION_MUTATION = gql`
  mutation createEdition($publishDate: Date!) {
    createEdition(publishDate: $publishDate) {
      id
      approvedAt
      publishOn (format: "YYYY-MM-DD")
      cssHref
      blurbs {
        id
        type
        data
      }
    }
  }`;

const CREATE_BLURB_MUTATION = gql`
  mutation createBlurb($type: String!, $editionId: ID) {
    createBlurb(type: $type, editionId: $editionId) {
      id
      type
      data
    }
  }`;

const EDITION_QUERY = gql`
  query currentEdition($publishDate: Date!) {
    edition(publishDate: $publishDate) {
      id
      approvedAt
      publishOn (format: "YYYY-MM-DD")
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
  graphql(APPROVE_EDITION_MUTATION, {
    props: ({ mutate }) => ({
      approveEdition: (editionId) => mutate({
        variables: { editionId }
      })
    })
  }),
  graphql(CREATE_EDITION_MUTATION, {
    props: ({ mutate }) => ({
      createEdition: (publishDate) => mutate({
        variables: { publishDate },
        updateQueries: {
          currentEdition: (prev, { mutationResult }) => {
            const newEdition = mutationResult.data.createEdition;
            return update(prev, {
              edition: {
                $set: newEdition
              }
            });
          }
        }
      })
    })
  }),
  graphql(CREATE_BLURB_MUTATION, {
    props: ({ mutate }) => ({
      createBlurb: (editionId) => mutate({
        variables: { editionId, type: 'paragraph' },
        updateQueries: {
          currentEdition: (prev, { mutationResult }) => {
            const newBlurb = mutationResult.data.createBlurb;
            return update(prev, {
              edition: {
                blurbs: {
                  $unshift: [newBlurb]
                }
              }
            });
          }
        }
      })
    })
  })
)(Edition);
