import React from 'react';
import templates from 'daily-templates';

const blurbDomForData = (type, data) => {
  const templateName = Object.keys(templates).find(tpl => tpl.toLowerCase() === type);
  const Template = templates[templateName];
  return (Template) ? <Template {...data}/> : null;
};

const Edition = ({blurbs}) => {
  return(
    <div>
      {blurbs.map((blurb) => blurbDomForData(blurb.blurb_type, blurb.data))}
    </div>
  );
};

export default Edition;
