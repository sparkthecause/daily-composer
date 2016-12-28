import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import update from 'react-addons-update';
import Header from '../components/Header';
import Blurbs from '../components/Blurbs';
import EditionNotFound from '../components/EditionNotFound';
import AddBlurbButton from '../components/AddBlurbButton';

const defaultDataForBlurbType = (blurbType) => {
  switch (blurbType) {
    case 'title':
      return { text: 'Title' };
    case 'paragraph':
      return { text: 'Paragraph' };
    case 'unsubscribe':
      return { href: '' };
    case 'header':
      return { img: { src: 'https://cdn.sparkthecause.com/daily/images/email_header_white.png' } };
    case 'share':
      return { sms: { img: { src: 'https://cdn.sparkthecause.com/daily/images/share_email.png' }, href: '' }, email: { img: { src: 'https://cdn.sparkthecause.com/daily/images/share_email.png' }, href: '' } };
    default:
      return null;
  }
};

class Edition extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeBlurbId: null,
      isAddingBlurb: false,
      isDeletingBlurb: false,
      isEditingBlurb: false,
      isMenuVisible: false,
      isRepositioningBlurb: false,
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

  deleteBlurb = () => {
    this.setState({
      isDeletingBlurb: true
    });
  }

  cancelBlurb = () => {
    this.setState({
      activeBlurbId: null,
      isEditingBlurb: false,
      isDeletingBlurb: false,
      isRepositioningBlurb: false
    });
  }

  editBlurb = () => {
    this.setState({
      isEditingBlurb: true
    });
  }

  saveBlurb = (data) => {

    const { activeBlurbId, isEditingBlurb, isDeletingBlurb, isRepositioningBlurb } = this.state;
    const { removeBlurb } = this.props;

    if (activeBlurbId) {

      if (isEditingBlurb) {

      }

      if (isDeletingBlurb) {
        removeBlurb(activeBlurbId);
      }

      if (isRepositioningBlurb) {

      }

    }

    this.setState({
      activeBlurbId: null,
      isEditingBlurb: false,
      isDeletingBlurb: false,
      isRepositioningBlurb: false
    });
  }

  repositionBlurb = () => {
    this.setState({
      isRepositioningBlurb: true
    });
  }

  showMenuForBlurb = (id) => {
    this.setState(({ activeBlurbId, isDeletingBlurb, isEditingBlurb, isRepositioningBlurb }, props) => ({
      activeBlurbId: (isDeletingBlurb || isEditingBlurb || isRepositioningBlurb) ?  activeBlurbId : id,
      isMenuVisible: true
    }));
  }

  showInfoPanel = () => {
    alert("info");
  }

  render() {
    const { data: { loading, edition, error }, params: { publishDate } } = this.props;
    const { activeBlurbId, isAddingBlurb, isDeletingBlurb, isEditingBlurb, isMenuVisible, isRepositioningBlurb, selectedBlurbType } = this.state;

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

    const setBlurbProps = (blurb) => {
      return blurb && blurb.id === activeBlurbId ? {
        ...blurb,
        isEditable: Boolean(blurb.data),
        isEditing: isEditingBlurb,
        isDeleting: isDeletingBlurb,
        isRepositioning: isRepositioningBlurb,
        isMenuVisible: isMenuVisible
      } : blurb;
    };

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
        <Blurbs
          blurbs={edition.blurbs.map(setBlurbProps)}
          onCancel={this.cancelBlurb}
          onDelete={this.deleteBlurb}
          onEdit={this.editBlurb}
          onReposition={this.repositionBlurb}
          onSave={this.saveBlurb}
          onShowMenu={this.showMenuForBlurb}/>
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
      id
      approvedAt
      publishOn (format: "YYYY-MM-DD")
      cssHref
      blurbs {
        id
        type
        data
        position
      }
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

const REMOVE_BLURB_MUTATION = gql`
  mutation removeBlurb($id: ID!) {
    removeBlurbFromEdition(id: $id) {
      id
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
        position
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
  graphql(REMOVE_BLURB_MUTATION, {
    props: ({ mutate }) => ({
      removeBlurb: (id) => mutate({
        variables: { id },
        updateQueries: {
          currentEdition: (prev, { mutationResult }) => {
            const index = prev.edition.blurbs.findIndex(blurb => blurb.id === id);
            return update(prev, {
              edition: {
                blurbs: {
                  $splice: [[index, 1]]
                }
              }
            });
          }
        }
      })
    })
  }),
)(Edition);
