import React from 'react';
import update from 'react-addons-update';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import templates from 'daily-templates';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import BlurbMenu from '../components/BlurbMenu';

const blurbDomForData = (type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return (Template) ? <Template {...data}/> : null;
};

const blurbEditModeDomForData = (id, type, data) => {
  return <div>EDIT ME</div>;
  // const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  // const Template = templates[templateName];
  // return (Template) ? <Template key={id} {...data}/> : null;
};

const sortByPosition = (a, b) => a.position - b.position;

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
      blurbs: arrayMove(blurbs, oldIndex, newIndex)
    }));
    this.saveBlurbPostitions();
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

  saveBlurbPostitions = () => {
    this.setState(({ blurbs }) => ({
      blurbs: blurbs.map((blurb, index) => ({ ...blurb, postition: index }))
    }));
    this.props.savePositions();
  }

  showMenuForBlurb = (id) => {
    this.setState(({ activeBlurbId, isDeletingBlurb, isEditingBlurb }) => ({
      activeBlurbId: (isDeletingBlurb || isEditingBlurb) ?  activeBlurbId : id,
      isMenuVisible: true
    }));
  }

  render() {
    const { activeBlurbId, blurbs, isDeletingBlurb, isEditingBlurb, isMenuVisible } = this.state;

    const BlurbWithMenu = SortableElement(({ data, id, isDeleting, isEditable, isEditing, isMenuVisible, type }) => {
      return (
        <div
          onMouseEnter={() => this.showMenuForBlurb(id)}
          className={`blurbWrapper ${isMenuVisible ? 'active' : ''} ${isDeleting ? 'deleting' : ''}`}>
          {isEditing ? blurbEditModeDomForData(type, data) : blurbDomForData(type, data)}
          {isMenuVisible && (
            <BlurbMenu
              id={id}
              isEditable={isEditable}
              isEditing={isEditing}
              isDeleting={isDeleting}
              onCancel={this.cancelBlurb}
              onEdit={this.editBlurb}
              onDelete={this.deleteBlurb}
              onSave={this.saveBlurb} />
          )}
        </div>
      );
    });

    const BlurbsContainer = SortableContainer(({ activeBlurbId, blurbs, isDeleting, isEditing, isMenuVisible}) => (
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
              type={type} />
          );
        })}
      </div>
    ));

    return(
      <BlurbsContainer
        activeBlurbId={activeBlurbId}
        blurbs={blurbs}
        isDeleting={isDeletingBlurb}
        isEditing={isEditingBlurb}
        isMenuVisible={isMenuVisible}
        onSortEnd={this.onRepositionEnd}
        useDragHandle={true} />
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
mutation saveBlurbPostitions($blurbPositions: [BlurbPosition]) {
  saveBlurbPostitions(blurbPositions: $blurbPositions) {
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
  })
  // graphql(SAVE_BLURB_POSITIONS_MUTATION, {
  //   props: ({ mutate }) => ({
  //     saveBlurbPostitions: (blurbPositions) => mutate({
  //       variables: { blurbPositions },
  //       updateQueries: {
  //         currentEdition: (prev, { mutationResult }) => {
  //           const index = prev.edition.blurbs.findIndex(blurb => blurb.id === id);
  //           return update(prev, {
  //             edition: {
  //               blurbs: {
  //                 $splice: [[index, 1]]
  //               }
  //             }
  //           });
  //         }
  //       }
  //     })
  //   })
  // })
)(Blurbs);
