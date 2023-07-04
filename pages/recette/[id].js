import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Container, Grid,  Typography, useTheme } from '@mui/material';
import { withApollo } from 'hoc/withApollo.jsx';
import Head from 'next/head';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import Parser from 'html-react-parser';
const GET_RECEIPE = `
    query recipe($id: String) {
      recipe(id: $id) {
        id
        label
        content
        time
        nbPerson
        pictures {
          id
          originalPicturePath
          label
        }
        ingredients {
          id
          name
          quantity
          unit
          description

        }
      }
    }
  `;
  const useStyles = makeStyles((theme) => ({
    cardInfo: {
      padding: '5em',
      backgroundColor: 'white',
      backgroundImage: "url('/icons/planet.svg')",
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      backgroundOpacity: ' 0.5',
      borderRadius: '0.5em',
      fontSize: '0.9em',
      width: '80%',
      justify: 'center',
      alignItems: 'center',
      maxWidth: 755,
      marginTop: ({ hasBannerUrl }) => (hasBannerUrl ? -53 : 20),
      marginBottom: 20,
      boxShadow: '0px 0px 38px -14px rgba(0, 0, 0, 0.46)',
      [theme.breakpoints.down('md')]: {
        padding: '2em',
        width: 'auto',
        marginBottom: 0,
      },
    },
    align: {
      'text-align': 'center',
    },
    description: {
      wordBreak: 'break-word',
      textAlign: 'justify',
      fontSize: '1rem !important',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '2em',
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    cardTitle: {
      color: theme.typography.h5.color,
      fontFamily: theme.typography.h5.fontFamily,
      textTransform: 'uppercase',
      textAlign: 'center',
      fontWeight: '400',
      fontSize: '2.5rem !important',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem !important',
      },
      border: {
        width: '3em',
        borderColor: '#2C367E',
        borderBottom: 'solid',
        borderBottomColor: '#2C367E',
        color: '#2C367E',
        height: '1em',
      },
    },
  }));

 

const RecipeById = ({ initialData }) => {
 
  const { data } = initialData;

  const bannerUrl = useMemo(() => {
    return (data?.recipe?.pictures || []).filter((picture) => picture.main).length >= 1
      ? data.recipe.pictures.filter((picture) => picture.main)[0].originalPicturePath : null;
  }, [data]);

  const stylesProps = useMemo(() => ({
      topImageSize: '250px',
      headerDisplay: 'static',
      hasBannerUrl: bannerUrl !== null,
    }), []);
    const styles = useStyles(stylesProps);


  return (
    <AppLayout>
            <Head>
        <title>
          {/* @ts-ignore */}
          {data?.recipe.label}
        </title>
        <meta name="description" content={data && (`${data.recipe.label}`)} />
        {data?.recipe?.pictures?.length >= 1
          && data.recipe.pictures.filter((picture) => picture.logo).length >= 1 && (
            <meta
              property="og:image"
              content={
                data.recipe.pictures.length >= 1
                  ? getImageUrl(
                    data.recipe.pictures.filter((picture) => picture.logo)[0]
                      .originalPicturePath,
                  )
                  : ''
              }
            />
        )}
        {data?.recipe?.pictures?.length >= 1
          && data.recipe.pictures.filter((picture) => picture.logo).length >= 0 && (
          <meta
            property="og:image"
            content={getImageUrl(bannerUrl)}
          />
        )}
        <meta property="og:title" content={data && (`${data.recipe.label}`)} />
        <meta property="og:description" content={data && data.recipe.shortDescription} />
        <meta name="twitter:title" content={data && (`${data.recipe.label}`)} />
        <meta name="twitter:description" content={data && data.recipe.shortDescription} />

      </Head>
      <Box>
      <Container className={styles.cardInfo}>
    

        <Grid container>
              <Typography variant="h1" className={styles.cardTitle}>
                  {data && data.recipe.label}
                </Typography>

                <br/>
                <div className={styles.border} />
                <br/>
                <br/>
                </Grid>
                <Grid container>
                <div>{data && Parser(data.recipe.content)}</div>
                </Grid>
       
      </Container>

      </Box>
    </AppLayout>
  );
};

export default withApollo()(RecipeById);

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(ctxt) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URI, {
    method: 'POST',
    body: JSON.stringify({
      operationName: 'recipe',
      variables: {
        id: ctxt.params.id,
      },
      query: GET_RECEIPE,
    }),
  });
  console.log('ioook');
  const initialData = await res.json();
  if (initialData.errors) {
  
    console.error(
      ` Error fetching recipe id ${ctxt.params.id
      } error message : ${initialData.errors[0].message
      }`,
    );
  }

  return {
    props: {
      initialData,
    },
  };
}
