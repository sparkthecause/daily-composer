import React from 'react';
import Header from '../components/Header';

const Edition = ({params}) => {

  const publishDate = params.publishDate;
  const onApprove = () => alert("approve"); // TODO: Toggle approved state
  const onInfo = () => alert("info"); // TODO: Toggle info menu
  const onNext = () => alert("next"); // TODO: Navigate to next date
  const onPrevious = () => alert("previous"); // TODO: Navigate to prev date

  return(
    <Header
      isApproved={false}
      onApprove={onApprove}
      onInfo={onInfo}
      onNext={onNext}
      onPrevious={onPrevious}
      publishDate={publishDate} />
  );
};

export default Edition;
