import React from 'react';
import Header from '../components/Header';
import Blurbs from '../components/Blurbs';

const Edition = ({params}) => {

  const editionId = params.editionId;
  const onApprove = () => alert("approve"); // TODO: Toggle approved state
  const onInfo = () => alert("info"); // TODO: Toggle info menu
  const onNext = () => alert("next"); // TODO: Navigate to next date
  const onPrevious = () => alert("previous"); // TODO: Navigate to prev date

  const fetchEditionForId = (id) => {
    return {
      "edition_id": "346401bd-9957-4ee5-9bfc-f8f1b80cd767",
      "publish_on": "2016-10-22T04:00:00.000Z",
      "subject": "The third is the bird",
      "approved_at": "2016-01-29T05:00:00.000Z",
      "css_href": "http://cdn.sparkthecause.com.s3.amazonaws.com/daily/styles/email.css",
      "blurbs": [{
        "blurb_id": "2ffbde71-ffb1-4935-a104-ec005bd5ea71",
        "position": 0,
        "edition_id": "346401bd-9957-4ee5-9bfc-f8f1b80cd767",
        "approved_at": "2016-04-30T23:39:59.360Z",
        "blurb_type": "header",
        "data": {
          "img": {
            "src": "https://cdn.sparkthecause.com/daily/images/email_header_white.png"
          }
        }
      }, {
        "blurb_id": "bf93e88e-0f70-4f44-bcb9-590239378171",
        "position": 1,
        "edition_id": "346401bd-9957-4ee5-9bfc-f8f1b80cd767",
        "approved_at": "2016-01-30T05:00:00.000Z",
        "blurb_type": "paragraph",
        "data": {
          "text": "Text about pandas..."
        }
      }, {
        "blurb_id": "e417eb5b-3080-433c-8c26-38d620428189",
        "position": 2,
        "edition_id": "346401bd-9957-4ee5-9bfc-f8f1b80cd767",
        "approved_at": "2016-01-30T22:29:01.090Z",
        "blurb_type": "title",
        "data": {
          "text": "Well hello there!"
        }
      }, {
        "blurb_id": "21b7d16c-abb6-4d2b-ad52-281ec3d9f947",
        "position": 3,
        "edition_id": "346401bd-9957-4ee5-9bfc-f8f1b80cd767",
        "approved_at": "2016-05-01T00:04:01.161Z",
        "blurb_type": "share",
        "data": {
          "sms": {
            "img": {
              "src": "https://cdn.sparkthecause.com/daily/images/share_text.png"
            },
            "href": ""
          },
          "email": {
            "img": {
              "src": "https://cdn.sparkthecause.com/daily/images/share_email.png"
            },
            "href": ""
          }
        }
      }, {
        "blurb_id": "65b5f800-e43c-47b9-bc21-d376c6fc583b",
        "position": 4,
        "edition_id": "346401bd-9957-4ee5-9bfc-f8f1b80cd767",
        "approved_at": null,
        "blurb_type": "unsubscribe",
        "data": {
          "href": "https://daily.sparkthecause.com/unsubscribe?id={{subscriber_id}}"
        }
      }]
    };
  };

  const editionData = fetchEditionForId(editionId);

  return(
    <div>
      <link rel="stylesheet" type="text/css" href={editionData.css_href} />
      <Header
        isApproved={Boolean(editionData.approved_at)}
        onApprove={onApprove}
        onInfo={onInfo}
        onNext={onNext}
        onPrevious={onPrevious}
        publishDate={editionData.publish_on} />
      <Blurbs blurbs={editionData.blurbs} />
    </div>
  );
};

export default Edition;
