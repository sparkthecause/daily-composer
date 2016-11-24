import React from 'react';
import templates from 'daily-templates';

const blurbDomForData = (id, type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return (Template) ? <Template key={id} {...data}/> : null;
};

const Edition = ({blurbs}) => {
  return(
    <div className="blurbs">
      {blurbs.map(({data, id, type}) => blurbDomForData(id, type, data))}
    </div>
  );
};

export default Edition;
