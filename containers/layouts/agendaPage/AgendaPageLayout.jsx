import { withApollo } from 'hoc/withApollo';
import Events from 'containers/layouts/agendaPage/Events';
import Filters from 'containers/layouts/agendaPage/Filters';
import Newsletter from 'containers/layouts/Newsletter';
import { Container, makeStyles } from '@material-ui/core';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const useStyles = makeStyles({
  main: {
    padding: '0',
    margin: '0',
  },
  layout: {
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: '#F6F6F6',
    padding: '50px 0',
    margin: '0',
    width: '100%',
    maxWidth: 'none',
  },
});

const AgendaPageLayout = () => {
  const GET_EVENTS = gql`
    query events($startingDate:String,$categories:[String]) {
      events (startingDate:$startingDate,categories:$categories) {
        id
        label
        startedAt
        endedAt
        published
        lat
        lng
        address
        city
        categories {
          id
          label
          icon
          color
        }
        actors {
          id
          name
        }
        pictures{
          id,
          label,
          originalPicturePath,
          originalPictureFilename,
          croppedPicturePath,
          croppedPictureFilename,
          croppedX,
          croppedY,
          croppedZoom,
          croppedRotation,
          position
        }

      }
    } 
  `;

  const date = new Date();

  date.setHours(0, 0, 0, 0);

  const classes = useStyles();
  const {
    data: eventData, loading, error, refetch,
  } = useQuery(
    GET_EVENTS, {
      variables: {
        startingDate: date.toISOString(),
      },
    },
  );
  return (
    <Container className={classes.main}>
      <Container className={classes.layout}>
        <Filters refetch={refetch} />
        {eventData && eventData.events
          && <Events data={eventData} />}
      </Container>
      <Newsletter />
    </Container>
  );
};

export default withApollo()(AgendaPageLayout);
