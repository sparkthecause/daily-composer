import React from 'react';
import templates from 'daily-templates';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
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
      isMenuVisible: false,
      isRepositioningBlurb: false
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
      isDeletingBlurb: false,
      isRepositioningBlurb: false
    });
  }

  editBlurb = () => {
    this.setState({
      isEditingBlurb: true
    });
  }

  onRepositionEnd = ({oldIndex, newIndex}) => {
    // this.setState({
    //   items: arrayMove(this.state.items, oldIndex, newIndex)
    // });
  };

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
        // this.setBlurbPostitions();
        // saveBlurbPositions();
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

  setBlurbPostitions = () => {

  }

  showMenuForBlurb = (id) => {
    this.setState(({ activeBlurbId, isDeletingBlurb, isEditingBlurb, isRepositioningBlurb }) => ({
      activeBlurbId: (isDeletingBlurb || isEditingBlurb || isRepositioningBlurb) ?  activeBlurbId : id,
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
        onSortStart={this.repositionBlurb}
        onSortEnd={this.onRepositionEnd}
        useDragHandle={true} />
    );

  };

}

Blurbs.propTypes = {
  blurbs: React.PropTypes.array.isRequired,
};

export default Blurbs;
