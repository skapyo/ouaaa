import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Container, Grid, Typography, useTheme } from '@mui/material';
import { withApollo } from 'hoc/withApollo.jsx';
import Head from 'next/head';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import Parser from 'html-react-parser';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import {
  getImageUrl
} from '../../utils/utils';
import Link from 'components/Link';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useSessionState } from '../../context/session/session';

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
        main
      }
      ingredients {
        id
        name
        quantity
        unit
        description
        IngredientBaseAlim {
          produit
          poids
          energie
          proteines
          lipides
          glucides
          empreinteCarbone
          agriculture
          transformation
          emballage
          transport
          distribution
          poidsParUnite
          densite
          poidsParCuillereASoupe
          poidsParCuillereACafe
        }
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
  fab: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: '1400',
    backgroundColor: '#2C367E',
    color: 'white',
    '&:hover': {
      color: '#2C367E',
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
  ingredientInfoGrid: {
    position: 'relative',
    textAlign: 'center',
    backgroundColor: '#ededf5',
    borderRadius: 5,
    '& > *:first-child': {
      border: 'none',
    },
  },
}));

const RecipeById = ({ initialData }) => {
  const { data } = initialData;

  const user = useSessionState();
  const bannerUrl = useMemo(() => {
    return (data?.recipe?.pictures || []).filter((picture) => picture.main).length >= 1
      ? data.recipe.pictures.filter((picture) => picture.main)[0].originalPicturePath
      : null;
  }, [data]);

  const showCarbonFootPrint = (carbonFootprint) => {

    if (carbonFootprint ==0) {
      carbonFootprint ="Non calculé"
    }
      else  if (carbonFootprint <0.001) {
          carbonFootprint = (carbonFootprint * 1000).toFixed(2) + ' g';
          
        } else {
          carbonFootprint = (parseInt(carbonFootprint)).toFixed(2);
        }
    return carbonFootprint;
  };

      const calculateCarbonFootprint = (quantity, baseIngredientAlim, unit) => {
       
        if(baseIngredientAlim && baseIngredientAlim!==null){
        let coefficient = 1;
        if(unit === 'g') {
          coefficient = 0.001;
        }
        if(unit === 'mg') {
          coefficient  =0.0001;
        }
        
        if(unit === 'kg') {
          coefficient = 1;
        }
        if(unit === 'L') {
          coefficient = 1*baseIngredientAlim.densite;
        }
        if(unit === 'cl') {
          coefficient = 0.01*baseIngredientAlim.densite;
        }
        if(unit === 'ml') {
          coefficient = 0.001*baseIngredientAlim.densite;
        }
        if(unit === 'cuillère à soupe') {
          coefficient =baseIngredientAlim.poidsParCuillereASoupe;
        }
        if(unit === 'cuillère à café') {
          coefficient = baseIngredientAlim.poidsParCuillereACafe;
        }
        
        return quantity * baseIngredientAlim.empreinteCarbone * coefficient;
      }else{
        return 0;
      }
      };
      const textExplantationCarbonFootprintCalculation = (ingredientBaseAlim) => {
        const agriculture = (ingredientBaseAlim?.agriculture * 100).toFixed(2);
        const transformation = (ingredientBaseAlim?.transformation * 100).toFixed(2);
        const emballage = (ingredientBaseAlim?.emballage * 100).toFixed(2);
        const transport = (ingredientBaseAlim?.transport * 100).toFixed(2);
        const distribution = (ingredientBaseAlim?.distribution * 100).toFixed(2);

        const title = `Réparation du calcul de l'empreinte carbone:
          Agriculture: ${agriculture}%
          Transformation: ${transformation}%
          Emballage: ${emballage}%
          Transport: ${transport}%
          Distribution: ${distribution}%`;

        return title;
      };
      

      const stylesProps = useMemo(() => ({
        topImageSize: '250px',
        headerDisplay: 'static',
        hasBannerUrl: bannerUrl !== null,
      }), []);
      const styles = useStyles(stylesProps);
      const columnSum = data.recipe.ingredients.reduce((sum, ingredient) => {
        let carbonFootprint =0;
        if( ingredient.IngredientBaseAlim &&  ingredient.IngredientBaseAlim!==null ){
          carbonFootprint =  calculateCarbonFootprint(
            ingredient.quantity,
            ingredient.IngredientBaseAlim,
            ingredient.unit
          );
        }
        return showCarbonFootPrint(sum + carbonFootprint);
      }, 0);

      return (
        <AppLayout>
          <Head>
            <title>
              {'Recette Végétarienne avec empreinte carbone : '}
              {data?.recipe.label}
            </title>
            <meta name="description" content={data && (`${data.recipe.label}`)} />
            {data?.recipe?.pictures?.length >= 1
              && data.recipe.pictures.filter((picture) => picture.main).length >= 1 && (
                <meta
                  property="og:image"
                  content={
                    data.recipe.pictures.length >= 1
                      ? getImageUrl(
                        data.recipe.pictures.filter((picture) => picture.main)[0]
                          .originalPicturePath,
                      )
                      : ''
                  }
                />
            )}
            {data?.recipe?.pictures?.length >= 1
              && data.recipe.pictures.filter((picture) => picture.main).length >= 0 && (
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
                <Grid item md={5} sm={10} className={[styles.align]}>
                  <Grid container className={[styles.ingredientInfoGrid]}>
                    <TableContainer>
                      <Table aria-label="Ingredient Table" size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Produit</TableCell>
                            <TableCell align="right">Quantité</TableCell>
                            <TableCell align="right">Unité</TableCell>
                            <TableCell align="right">Empreinte Carbone (kg CO2)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          { data.recipe.ingredients.map((ingredient) => (
                            <TableRow key={ingredient.id}>
                              <TableCell>{ingredient.IngredientBaseAlim && ingredient.IngredientBaseAlim.produit ? ingredient.IngredientBaseAlim.produit : ingredient.name}</TableCell>
                              <TableCell align="right">{ingredient.quantity}</TableCell>
                              <TableCell align="right">{ingredient.unit}</TableCell>
                              <TableCell align="right">
                                {showCarbonFootPrint(calculateCarbonFootprint(
                                  ingredient.quantity,
                                  ingredient.IngredientBaseAlim,
                                  ingredient.unit
                                ))}
                                {" "}
                                <Tooltip title={textExplantationCarbonFootprintCalculation(ingredient.IngredientBaseAlim)}>
                                  <InfoIcon />
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                           <TableRow >
                              <TableCell></TableCell>
                              <TableCell align="right"></TableCell>
                              <TableCell align="right"></TableCell>
                              <TableCell align="right">
                            
                               Total :  {columnSum}
                    
                              </TableCell>
                            </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  {data?.recipe?.pictures?.length >= 1
                  && data.recipe.pictures.filter((picture) => picture.main).length >= 0 && (
                    <div  className={[styles.bannerDiv]}>
                    <br/>
                      <img
                          src={getImageUrl(bannerUrl)}
                          className={[styles.bannerUrl]}
                                  />
        
                  </div>
                  )}
                </Grid>
                <Grid item md={7} sm={10} className={styles.description}>
                  <Grid container>
                    <div style={{ width: "100%" }}>
                    <Typography variant="h1" className={styles.cardTitle} align="center">
                      {data && data.recipe.label}
                    </Typography>
                    </div>
                    <br/>
                    <div className={styles.border} />
                    <br/>
                    <br/>
                  </Grid>
                  <Grid container>
                    <div>{data && Parser(data.recipe.content)}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Container>

            {
              (data && (user && data.recipe?.user?.id === user.id ) || (user && user.role === 'admin')) && (
                <Link href={`/actorAdmin/recipe/${ data.recipe.id}`}>
                  <Fab className={styles.fab} aria-label="edit">
                    <EditIcon />
                  </Fab>
                </Link>
              )
            }
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationName: 'recipe',
      variables: {
        id: ctxt.params.id,
      },
      query: GET_RECEIPE,
    }),
  });

  const initialData = await res.json();

  if (initialData.errors) {
    console.error(
      ` Error fetching recipe id ${ctxt.params.id
      } error message : ${initialData.errors[0].message
      }`,
    );
  } else {
    debugger;
    console.log('initialData', initialData.data.recipe);
  }

  return {
    props: {
      initialData,
    },
  };
}
