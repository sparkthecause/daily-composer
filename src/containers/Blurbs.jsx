import React from 'react';
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
          isEditable={Boolean(data)}
          isEditing={isActiveBlurb && isEditing}
          isDeleting={isActiveBlurb && isDeleting}
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
      blurbs: blurbs && [ ...blurbs.sort(sortByPosition) ],
      editingBlurbData: null,
      isDeletingBlurb: false,
      isEditingBlurb: false,
      isMenuVisible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { blurbs } = nextProps;
    this.setState({
      blurbs: blurbs && [ ...blurbs.sort(sortByPosition) ],
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
      isEditingBlurb: false,
      isDeletingBlurb: false
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

    const { activeBlurbId, editingBlurbData, isEditingBlurb, isDeletingBlurb } = this.state;
    const { editionId, removeBlurb, updateBlurb } = this.props;

    if (activeBlurbId) {

      if (isEditingBlurb) {
        console.log('SAVE: ', activeBlurbId, editingBlurbData);
        updateBlurb(activeBlurbId, editingBlurbData);
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

  updateBlurbData = (data) => {
    this.setState({
      editingBlurbData: data
    });
  }

  render() {
    const { activeBlurbId, blurbs, editingBlurbData, isDeletingBlurb, isEditingBlurb, isMenuVisible } = this.state;

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
        isDeleting={isDeletingBlurb}
        isEditing={isEditingBlurb}
        isMenuVisible={isMenuVisible}
        onSortEnd={this.onRepositionEnd}
        useDragHandle={true}
        menuActions={menuActions}
        showMenuForBlurb={this.showMenuForBlurb}
        updateBlurbData={this.updateBlurbData} />
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
mutation saveBlurbData($blurbId: ID!, $data: JSON) {
  updateBlurb(id: $blurbId, data: $data) {
    id
    data
  }
}`;

Blurbs.propTypes = {
  blurbs: React.PropTypes.array.isRequired,
  editionId: React.PropTypes.string.isRequired
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
      updateBlurb: ( blurbId, data ) => mutate({
        variables: { blurbId, data },
        updateQueries: {
          currentEdition: (prev, { mutationResult }) => {
            const { id, data: newData } = mutationResult.data.updateBlurb;
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
