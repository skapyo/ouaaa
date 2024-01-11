import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import { Typography, Container, Stack } from '@mui/material';
import { useTheme } from '@mui/material';
import ActorCard from 'components/cards/ActorCard';
import Head from 'next/head';
import AppLayout from 'containers/layouts/AppLayout';
import { withApollo } from 'hoc/withApollo.jsx';
import makeStyles from '@mui/styles/makeStyles';
import dynamic from 'next/dynamic';

const useStyles = makeStyles((theme) => ({
  map: {
    width: '100%',
    height: '400px',
    [theme.breakpoints.down('md')]: {
      height: '300px',
    },
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
}));
const GET_ENTRY = `
query entry($id: String!) {
  entry(id: $id) {
    id
    label
    description
  }
}`;

const GET_ACTORS_BY_ENTRY = `
query actorsByEntry($entryId: String!) {
  actorsByEntry(entryId: $entryId) {
    id
    name
    address
    city
    shortDescription
    lat
    lng
    entries {
      label
      icon
      color
      description
      parentEntry {
        code
        label
        color
      }
    }
    pictures {
      id
      label
      originalPicturePath
      originalPictureFilename
      position
      logo
    }
    favorites {
      id
    }
  }
}`;

const AnnuaireEntryPage = ({ entry, actors }) => {
  const { data } = actors;
  let find = ' ; ';
  let reg = new RegExp(find, 'g');
  const mapRef = useRef();

 
  const theme = useTheme();
  const stylesProps = useMemo(() => ({
    topImageSize: '250px',
    headerDisplay: 'static',
  }), []);
  const styles = useStyles(stylesProps);
  const MarkerActorWithNoSSR = dynamic(() => import('../../components/map/ActorMarker'), {
    ssr: false,
  });
  const MapWithNoSSR = dynamic(() => import('../../components/map/Map'), {
    ssr: false,
  });
  return (
    <AppLayout>
      <Head>
        <title>
          { entry.data.entry.description?.replace(reg ,', ').substring(0, entry.data.entry.description.length > 90 ? 90 : entry.data.entry.description.length) } La rochelle
        </title>
        <meta name="description" content={ entry.data.entry.label + ' - ' +entry.data.entry.description} />
      </Head>

      

      <Container sx={{
        backgroundColor: '#F6F6F6',
      }}
      >
        <Container maxWidth="md">
          <Typography variant="h1" pt={4}>{ entry.data.entry.label }</Typography>
          <Typography variant="h2">{ entry.data.entry.description }</Typography>
              <>
                  <div className={styles.map}>
                    <MapWithNoSSR
                      actor={data?.actorsByEntry}
                      ref={mapRef}
                      scrollWheelZoom={false}
                      id="map"
                      classMap={styles.mapContainer}
                    >
                     
                      { data?.actorsByEntry.map((actor) => {
                      return (
                        <MarkerActorWithNoSSR actor={actor} />
                      );
                      })
                    }
                    </MapWithNoSSR>
                  </div>
                  </>
          <Stack spacing={2} py={4}>
            {actors && (data?.actorsByEntry?.map((actor) => {
              return <ActorCard key={actor.id} actor={actor} />;
            }))}
            {actors && (data?.actorsByEntry?.length < 1)
            && (<Typography>Pas d'acteur dans cette catégorie</Typography>)}
          </Stack>
        </Container>
      </Container>
    </AppLayout>
  );
};

export default withApollo()(AnnuaireEntryPage);

export async function getServerSideProps(context) {
  const { entryId } = context.query;
  console.log("sdd"+entryId);
  const actorsResponse = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({
      operationName: 'actorsByEntry',
      variables: {
        entryId,
      },
      query: GET_ACTORS_BY_ENTRY,
    }),
  });
  const entryResponse = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({
      operationName: 'entry',
      variables: {
        id: entryId,
      },
      query: GET_ENTRY,
    }),
  });

  const actors = await actorsResponse.json();
  const entry = await entryResponse.json();
  if (actors.errors) {
    console.error(
      `Error fetching actors by entry, error message : ${actors.errors[0].message}`,
    );
  }
  if (entry.errors) {
    console.error(
      `Error fetching entry, error message : ${entry.errors[0].message}`,
    );

   
  }
  console.log(entry);
  console.log(actors);
  return {
    props: {
      entry,
      actors,
    },
  };
}
