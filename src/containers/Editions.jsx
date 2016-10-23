import React from 'react';
import { Link } from 'react-router';

const Editions = ({children}) => {

  // replace with dynamic data fetch
  const editions = [{
    id: '346401bd-9957-4ee5-9bfc-f8f1b80cd767',
      publishDate: '20160504'
  }, {
    id: '2164asdd-9944-4df5-7bfc-d8f1b80cd123',
    publishDate: '20160214'
  }];

  const editionLinks = editions.map((edition) => {
    return (
      <li key={edition.id}>
        <Link to={`/editions/${edition.id}`}>
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
