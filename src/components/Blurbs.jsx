import React from 'react';
import templates from 'daily-templates';
import AddBlurbButton from './AddBlurbButton';

const blurbDomForData = (id, type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return (Template) ? <Template key={id} {...data}/> : null;
};

const Edition = ({ blurbs, onAddBlurb }) => {
  return(
    <div className="blurbs">
      {blurbs.map(({ data, id, type }) => blurbDomForData(id, type, data))}
      <AddBlurbButton onAddBlurb={onAddBlurb} />
    </div>
  );
};

export default Edition;
