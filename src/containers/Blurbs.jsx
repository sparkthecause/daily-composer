import React from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import BlurbWithMenu from '../components/BlurbWithMenu';

const sortByPosition = (a, b) => a.position - b.position;
const reindexBlurbs = (blurb, index) => ({ ...blurb, position: index });

const BlurbsContainer = SortableContainer(({
  activeBlurbId,
  blurbs,
  editingBlurbData,
  editingBlurbFile,
  isChangePending,
  isDeleting,
  isEditing,
  isMenuVisible,
  menuActions,
  showMenuForBlurb,
  updateBlurbData
}) => (
  <div className="blurbs">
    {blurbs.map(({ data, id, position, type }) => {
      const isActiveBlurb = id === activeBlurbId;
      return (
        <BlurbWithMenu
          data={(isActiveBlurb && isEditing && editingBlurbData) ? editingBlurbData : data}
          id={id}
          index={position}
          isChangePending={isChangePending}
          isDeleting={isActiveBlurb && isDeleting}
          isEditable={Boolean(data)}
          isEditing={isActiveBlurb && isEditing}
          isMenuVisible={isActiveBlurb && isMenuVisible}
          key={id}
          menuActions={menuActions}
          onShowMenuForBlurb={showMenuForBlurb}
          type={type}
          updateData={updateBlurbData} />
      );
    })}
  </div>
));

class Blurbs extends React.Component {
  constructor(props) {
    super(props);

    const { blurbs } = props;

    this.state = {
      activeBlurbId: null,
      blurbs: blurbs && [ ...blurbs ].sort(sortByPosition),
      editingBlurbData: null,
      editingBlurbFile: null,
      isChangePending: false,
      isDeletingBlurb: false,
      isEditingBlurb: false,
      isMenuVisible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { blurbs } = nextProps;
    this.setState({
      blurbs: blurbs && [ ...blurbs ].sort(sortByPosition),
    });
  }

  deleteBlurb = () => {
    this.setState({
      isDeletingBlurb: true
    });
  }

  cancelBlurb = () => {
    this.setState({
      activeBlurbId: null,
      editingBlurbData: null,
      editingBlurbFile: null,
      isChangePending: false,
      isDeletingBlurb: false,
      isEditingBlurb: false
    });
  }

  editBlurb = () => {
    this.setState({
      isEditingBlurb: true
    });
  }

  onRepositionEnd = ({oldIndex, newIndex}) => {
    this.setState(({ blurbs }) => ({
      blurbs: arrayMove(blurbs, oldIndex, newIndex).map(reindexBlurbs)
    }));
    const { savePositions } = this.props;
    const newBlurbPositions = this.state.blurbs.map(({ id, position }) => ({ id, position }));
    savePositions(newBlurbPositions);
  };

  saveBlurb = (data) => {

    const { activeBlurbId, editingBlurbData, editingBlurbFile, isEditingBlurb, isDeletingBlurb } = this.state;
    const { editionId, removeBlurb, updateBlurbData } = this.props;

    if (activeBlurbId) {

      if (isEditingBlurb) {
        updateBlurbData(activeBlurbId, editingBlurbData, editingBlurbFile);
      }

      if (isDeletingBlurb) {
        this.setState(({ blurbs }) => ({
          blurbs: blurbs.filter(({ id }) => id !== activeBlurbId).map(reindexBlurbs)
        }));
        removeBlurb(activeBlurbId, editionId);
      }

    }

    this.setState({
      activeBlurbId: null,
      editingBlurbData: null,
      editingBlurbFile: null,
      isEditingBlurb: false,
      isDeletingBlurb: false
    });
  }

  showMenuForBlurb = (id) => {
    this.setState(({ activeBlurbId, isDeletingBlurb, isEditingBlurb }) => ({
      activeBlurbId: (isDeletingBlurb || isEditingBlurb) ?  activeBlurbId : id,
      isMenuVisible: true
    }));
  }

  changeBlurbData = (data, file) => {
    this.setState({
      editingBlurbData: data,
      editingBlurbFile: file,
      isChangePending: true
    });
  }

  render() {
    const { activeBlurbId, blurbs, editingBlurbData, editingBlurbFile, isChangePending, isDeletingBlurb, isEditingBlurb, isMenuVisible } = this.state;

    const menuActions = {
      onCancel: this.cancelBlurb,
      onDelete: this.deleteBlurb,
      onEdit: this.editBlurb,
      onSave: this.saveBlurb
    };

    return(
      <BlurbsContainer
        activeBlurbId={activeBlurbId}
        blurbs={blurbs}
        editingBlurbData={editingBlurbData}
        editingBlurbFile={editingBlurbFile}
        isChangePending={isChangePending}
        isDeleting={isDeletingBlurb}
        isEditing={isEditingBlurb}
        isMenuVisible={isMenuVisible}
        onSortEnd={this.onRepositionEnd}
        useDragHandle={true}
        menuActions={menuActions}
        showMenuForBlurb={this.showMenuForBlurb}
        updateBlurbData={this.changeBlurbData} />
    );

  };

}

const REMOVE_BLURB_MUTATION = gql`
mutation removeBlurb($blurbId: ID!, $editionId: ID!) {
  removeBlurbFromEdition(blurbId: $blurbId, editionId: $editionId) {
    id
    position
  }
}`;

const SAVE_BLURB_POSITIONS_MUTATION = gql`
mutation saveBlurbPostitions($blurbPositions: [BlurbPositionInput]) {
  repositionBlurbs(blurbPositions: $blurbPositions) {
    id
    position
  }
}`;

const SAVE_BLURB_DATA_MUTATION = gql`
mutation saveBlurbData($blurbId: ID!, $data: JSON, $file: Upload) {
  updateBlurbData(id: $blurbId, data: $data, file: $file) {
    id
    data
  }
}`;

Blurbs.propTypes = {
  blurbs: PropTypes.array.isRequired,
  editionId: PropTypes.string.isRequired
};

export default compose(
  graphql(REMOVE_BLURB_MUTATION, {
    props: ({ mutate }) => ({
      removeBlurb: ( blurbId, editionId ) => mutate({
        variables: { blurbId, editionId },
        updateQueries: {
          currentEdition: (prev, { mutationResult }) => {
            const newPositions = mutationResult.data.removeBlurbFromEdition;
            return update(prev, {
              edition: {
                blurbs: {
                  $set: prev.edition.blurbs.filter(({ id }) => id !== blurbId).map(blurb => {
                    const { position } = newPositions.find(pos => pos.id === blurb.id) || {};
                    return { ...blurb, position };
                  })
                }
              }
            });
          }
        }
      })
    })
  }),
  graphql(SAVE_BLURB_POSITIONS_MUTATION, {
    props: ({ mutate }) => ({
      savePositions: ( blurbPositions ) => mutate({
        variables: { blurbPositions },
        updateQueries: {
          currentEdition: (prev, { mutationResult }) => {
            const newPositions = mutationResult.data.repositionBlurbs;
            return update(prev, {
              edition: {
                blurbs: {
                  $set: prev.edition.blurbs.map(blurb => {
                    const { position } = newPositions.find(pos => pos.id === blurb.id) || {};
                    return { ...blurb, position };
                  })
                }
              }
            });
          }
        }
      })
    })
  }),
  graphql(SAVE_BLURB_DATA_MUTATION, {
    props: ({ mutate }) => ({
      updateBlurbData: ( blurbId, data, file ) => mutate({
        variables: { blurbId, data, file },
        updateQueries: {
          currentEdition: (prev, { mutationResult }) => {
            const { id, data: newData } = mutationResult.data.updateBlurbData;
            return update(prev, {
              edition: {
                blurbs: {
                  $set: prev.edition.blurbs.map(blurb => (blurb.id === id) ? { ...blurb, data: newData } : blurb)
                }
              }
            });
          }
        }
      })
    })
  })
)(Blurbs);
