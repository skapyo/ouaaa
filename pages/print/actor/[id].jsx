import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { withApollo } from 'hoc/withApollo';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import ActorToPrint from '../../../components/print/ActorGame';

const GET_ACTOR = gql`
query actor($id: String) {
  actor(id: $id) {
    id
    name
    address
    lat
    lng
    address
    city
    email
    phone
    website
    description
    shortDescription
    socialNetwork
    volunteerDescription
    activity
    favorites {
      id
    }
    entries {
      label
      icon
      collection {
        code
        label
      }
      parentEntry {
        code
        label
        color
        collection {
          code
          label
        }
      }
    }
    referents {
      id
      surname
      lastname
    }
    isValidated
    pictures {
      id
      label
      originalPicturePath
      originalPictureFilename
      position
      logo
      main
    }
    openingHours {
      days {
        identifier
        day
        selected
      }
      hours
      place
    }
  }
}
`;

const Print = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery(GET_ACTOR, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  return (
    <ActorToPrint actor={data?.actor} />
  );
};

export default withApollo()(Print);
