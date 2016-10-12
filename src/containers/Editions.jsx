import React from 'react';
import { Link } from 'react-router';

const Editions = ({children}) => {

  // replace with dynamic data fetch
  const editions = [{
    publishDate: '20160504'
  }, {
    publishDate: '20160506'
  }];

  const editionLinks = editions.map((edition) => {
    return (
      <li key={edition.publishDate}>
        <Link to={`/editions/${edition.publishDate}`}>
          {edition.publishDate}
        </Link>
      </li>
    );
  })

  return (
    <div>
      {children ? null : <ul>{editionLinks}</ul>}
      {children}
    </div>
  );
};

export default Editions;
