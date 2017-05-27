import React from 'react';
import update from 'react-addons-update';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { addDays, format, subDays } from 'date-fns';
import Header from '../components/Header';
import Subject from '../components/Subject';
import Blurbs from '../containers/Blurbs';
import EditionNotFound from '../components/EditionNotFound';
import AddBlurbButton from '../components/AddBlurbButton';

const defaultDataForBlurbType = (blurbType) => {
  switch (blurbType) {
    case 'title':
      return { text: 'Title' };
    case 'image':
      return { src: 'https://cdn.sparkthecause.com/daily/images/placeholder_image.jpg', alt:' Placeholder' };
    case 'paragraph':
      return { text: 'Paragraph' };
    case 'unsubscribe':
      return { href: '' };
    case 'header':
      return { img: { src: 'https://cdn.sparkthecause.com/daily/images/email_header_white.png' } };
    case 'share':
      return { sms: { img: { src: 'https://cdn.sparkthecause.com/daily/images/share_text.png' }, href: '' }, email: { img: { src: 'https://cdn.sparkthecause.com/daily/images/share_email.png' }, href: '' } };
    default:
      return null;
  }
};

class Edition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAddingBlurb: false,
      selectedBlurbType: ''
    };
  }

  approveEdition = () => {
    const { approveEdition, data: { edition: { id } } } = this.props;
    approveEdition(id);
  }

  createEdition = () => {
    const { createEdition, params: { publishDate } } = this.props;
    const defaultCssHref = 'https://s3.amazonaws.com/cdn.sparkthecause.com/daily/styles/email.css';
    createEdition(publishDate, defaultCssHref);
  }

  addBlurb = () => {
    this.setState({
      isAddingBlurb: true
    });
  }

  blurbTypeSelected = (event) => {
    const selectedBlurbType = event.target.value;
    this.setState({ selectedBlurbType });
    if (selectedBlurbType) {
      const { createBlurb, data: { edition: { id, blurbs } } } = this.props;
      const defaultData = defaultDataForBlurbType(selectedBlurbType);
      const position = blurbs && blurbs.length;
      createBlurb(id, selectedBlurbType, defaultData, position);
      this.setState({
        isAddingBlurb: false,
        selectedBlurbType: ''
      });
    }
  }

  updateSubject = (subject) => {
    const { updateSubject, data: { edition: { id } } } = this.props;
    updateSubject(id, subject);
  }

  showInfoPanel = () => {
    alert("info");
  }

  render() {
    const { data: { loading, edition, error }, params: { publishDate } } = this.props;
    const { isAddingBlurb, selectedBlurbType } = this.state;

    const nextDate = format('YYYY-MM-DD', addDays(publishDate, 1));
    const previousDate = format('YYYY-MM-DD', subDays(publishDate, 1));
    const formattedPublishDate = format(publishDate, 'ddd, MMM D');

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
          <span> ERROR </span>
        </div>
      );

    } else if (!edition) {

      return(
        <div>
          <Header
            onInfo={this.showInfoPanel}
            nextDate={nextDate}
            previousDate={previousDate}
            publishDate={formattedPublishDate} />
          <EditionNotFound
            createEdition={this.createEdition} />
          </div>
      );

    }

    return(
      <div>
        <link
          rel="stylesheet"
          type="text/css"
          href={edition.cssHref} />
        <Header
          isApproved={Boolean(edition.approvedAt)}
          onApprove={this.approveEdition}
          onInfo={this.showInfoPanel}
          nextDate={nextDate}
          previousDate={previousDate}
          publishDate={formattedPublishDate} />
        <Subject
          onChange={this.updateSubject}
          subject={edition.subject} />
        <Blurbs
          blurbs={edition.blurbs}
          editionId={edition.id} />
        <AddBlurbButton
          isAddingBlurb={isAddingBlurb}
          onAddBlurb={this.addBlurb}
          onBlurbTypeSelected={this.blurbTypeSelected}
          selectedBlurbType={selectedBlurbType} />
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
  mutation createEdition($publishDate: Date!, $cssHref: String) {
    createEdition(publishDate: $publishDate, cssHref: $cssHref) {
      approvedAt
      blurbs {
        id
        type
        data
        position
      }
      cssHref
      id
      publishOn (format: "YYYY-MM-DD")
      subject
    }
  }`;

const CREATE_BLURB_MUTATION = gql`
  mutation createBlurb($type: String!, $editionId: ID, $data: JSON, $position: Int) {
    createBlurb(type: $type, editionId: $editionId, data: $data, position: $position) {
      id
      type
      data
      position
    }
  }`;

const EDITION_QUERY = gql`
  query currentEdition($publishDate: Date!) {
    edition(publishDate: $publishDate) {
      approvedAt
      blurbs {
        id
        type
        data
        position
      }
      cssHref
      id
      publishOn (format: "YYYY-MM-DD")
      subject
    }
  }`;
const UPDATE_SUBJECT_MUTATION = gql`
  mutation updateSubjectForEdition($editionId: ID!, $subject: String) {
    updateEdition(id: $editionId, subject: $subject) {
      id
      subject
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
      createEdition: (publishDate, cssHref) => mutate({
        variables: { publishDate, cssHref },
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
      createBlurb: (editionId, type, data, position) => mutate({
        variables: { editionId, type, data, position },
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
  }),
  graphql(UPDATE_SUBJECT_MUTATION, {
    props: ({ mutate }) => ({
      updateSubject: (editionId, subject) => mutate({
        variables: { editionId, subject }
      })
    })
  }),
)(Edition);
