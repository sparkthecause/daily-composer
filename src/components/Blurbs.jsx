import React from 'react';

const Edition = ({blurbs}) => {

  const listItem = (blurb) => {
    return (
      <li key={blurb.blurb_id}>{blurb.blurb_type}
        <ul>
          <li>{blurb.blurb_id}</li>
          <li>{blurb.approved_at || 'Not Approved'}</li>
        </ul>
      </li>
    );
  };

  return(
    <ol>
      {blurbs.map((blurb) => listItem(blurb))}
    </ol>
  );
};

export default Edition;
