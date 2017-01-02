import React from 'react';
import update from 'react-addons-update';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import BlurbWithMenu from '../components/BlurbWithMenu';

const sortByPosition = (a, b) => a.position - b.position;

const BlurbsContainer = SortableContainer(({ activeBlurbId, blurbs, isDeleting, isEditing, isMenuVisible, menuActions, showMenuForBlurb }) => (
  <div className="blurbs">
    {blurbs.map(({ data, id, position, type }) => {
      const isActiveBlurb = id === activeBlurbId;
      return (
        <BlurbWithMenu
          data={data}
          id={id}
          index={position}
          isEditable={Boolean(data)}
          isEditing={isActiveBlurb && isEditing}
          isDeleting={isActiveBlurb && isDeleting}
          isMenuVisible={isActiveBlurb && isMenuVisible}
          key={id}
          menuActions={menuActions}
          onShowMenuForBlurb={showMenuForBlurb}
          type={type} />
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
      blurbs: arrayMove(blurbs, oldIndex, newIndex).map((blurb, index) => ({ ...blurb, position: index }))
    }));
    const { savePositions } = this.props;
    const newBlurbPositions = this.state.blurbs.map(({ id, position }) => ({ id, position }));
    savePositions(newBlurbPositions);
  };

  saveBlurb = (data) => {

    const { activeBlurbId, isEditingBlurb, isDeletingBlurb } = this.state;
    const { removeBlurb } = this.props;

    if (activeBlurbId) {

      if (isEditingBlurb) {

      }

      if (isDeletingBlurb) {
        removeBlurb(activeBlurbId);
      }

    }

    this.setState({
      activeBlurbId: null,
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

  render() {
    const { activeBlurbId, blurbs, isDeletingBlurb, isEditingBlurb, isMenuVisible } = this.state;

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
        isDeleting={isDeletingBlurb}
        isEditing={isEditingBlurb}
        isMenuVisible={isMenuVisible}
        onSortEnd={this.onRepositionEnd}
        useDragHandle={true}
        menuActions={menuActions}
        showMenuForBlurb={this.showMenuForBlurb}/>
    );

  };

}

const REMOVE_BLURB_MUTATION = gql`
mutation removeBlurb($id: ID!) {
  removeBlurbFromEdition(id: $id) {
    id
  }
}`;

const SAVE_BLURB_POSITIONS_MUTATION = gql`
mutation saveBlurbPostitions($blurbPositions: [BlurbPositionInput]) {
  repositionBlurbs(blurbPositions: $blurbPositions) {
    id
    position
  }
}`;

Blurbs.propTypes = {
  blurbs: React.PropTypes.array.isRequired,
};

export default compose(
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
  graphql(SAVE_BLURB_POSITIONS_MUTATION, {
    props: ({ mutate }) => ({
      savePositions: (blurbPositions) => mutate({
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
  })
)(Blurbs);
