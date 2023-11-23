import { Container, Theme, Typography } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { withApollo } from 'hoc/withApollo';
import ClassicButton from 'components/buttons/ClassicButton';
import AddActorForm from 'containers/forms/AddActorForm';
import CharterForm from 'containers/forms/CharterForm';
import AddActorPageLayout from 'containers/layouts/addActorPage/AddActorPageLayout';
import graphqlTag from 'graphql-tag';
import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem';
import { useQuery } from '@apollo/client';
import React, { useCallback, useEffect } from 'react';
import Icon from '@mui/material/Icon';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSessionState } from 'context/session/session';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Link from '../../components/Link';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: string;
  labelInfo?: string;
  labelText: string;
};
const useTreeItemStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles();
  const {
    labelText, labelIcon, labelInfo, color, bgColor, ...other
  } = props;

  return (
    <TreeItem
      label={(
        <div className={classes.labelRoot}>
          <Icon>{labelIcon}</Icon>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      )}
      style={{
        // @ts-ignore
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '200px',
    height: '200px',
    marginBottom: theme.spacing(4),
  },
  userInfosTitle: {
    marginBottom: theme.spacing(5),
  },
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  buttonAuthentification: {
    color: '#D96552!important',
  },
  registerInfo: {
    padding: '2em',
  },
  legal: {
    fontSize :'0.9em',
    padding: '1em',
    'text-align': 'justify',
  },
}));

const GET_CATEGORIES = graphqlTag`
    { 
        categories {
            id
            label
            icon
            subCategories {
                id
                label
                icon
                    subCategories {
                    id
                    label
                    icon
                    subCategories {
                        id
                        label
                        icon
                    }
                }
            }
        }
    }
`;
const AccountPage = () => {
  const styles = useStyles();
  const classes = useTreeItemStyles();
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const { proposeNewActor } = router.query;
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    fetchPolicy: 'network-only',
  });

  const steps = getSteps();
  function getSteps() {
    if(proposeNewActor === undefined){
      return ['Authentifiez vous', 'Acceptez la charte de OUAAA', "Ajoutez vos informations d'acteur"];
    }else{
      return ['Authentifiez vous', 'Proposez un nouvel acteur'];
    }
    
  }
  const user = useSessionState();

  const signinClickHandler = useCallback(() => {
    setCookie('redirect_url', router.asPath, { path: '/' });
  }, [setCookie, router.asPath]);

  const [charterAccepted, setCharterAccepted] = React.useState(false);
  let initalValue;
  if (!user) {
    initalValue = 0;
  } else {
    initalValue = 1;
  } 
  const [activeStep, setActiveStep] = React.useState(initalValue);

  const handleChangeCharter = (results, name) => {
    setActiveStep(3);
    setCharterAccepted(!charterAccepted);
  };


 

  return (
    <AddActorPageLayout>
      <Typography
        color="secondary"
        variant="h6"
        className={styles.userInfosTitle}
      >
        {proposeNewActor === undefined && (
          <>
        Se référencer en tant qu'acteur de la transition
        </>
        ) }
       {proposeNewActor !== undefined && (
          <>
          Proposer un nouvel acteur
          </>
      )}
      </Typography>
      <Container component="main" maxWidth="sm">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Container>
      {user && (!charterAccepted  && proposeNewActor === undefined)&& <CharterForm handleChangeCharter={handleChangeCharter} />}
      {user && (charterAccepted || proposeNewActor !== undefined)&& <AddActorForm />}
      {!user && (
        <div className={styles.registerInfo}>
          <div>
            <Typography>
              Vous pouvez créer un compte générique pour l'administation de
              votre acteur
            </Typography>
          </div>
          <div>
            <Typography>
              ou un compte personnel qui permettera d'intéragir en votre nom sur
              l'outil
            </Typography>
          </div>
          <div className={styles.legal}>
            Les données personnelles relatives à la création du compte (nom/prénom, structure si
            professionnel, numéro de téléphone, email) sont destinées à permettre l’identification sur le site
            et l’accès à son compte et aux fonctionnalités correspondantes. Les données sont conservées
            tant que le compte est actif. Une fois par an, le responsable de traitement peut effectuer une
            campagne de vérification d’adresse mails pour supprimer les comptes inactifs après vérification
            par contact téléphonique<br/>
            Les fiches acteurs reliées à des comptes inactifs seront mises à jour avec la mention suivante :
            coordonnées obsolètes à telle date. Pour toute question, vous pouvez joindre l’administrateur du
            site à contact@ouaaa-transition.fr et exercer vos droits d’accès, de rectification ou de suppression
            aurprès du DPD à dpd@ouaaa-transition.fr
          </div>
        </div>
      )}
      {!user && (
        /* @ts-ignore */
        <Link href="/signin" className={styles.buttonAuthentification}>
          <ClassicButton onClick={signinClickHandler}>
            S'authentifier
          </ClassicButton>
        </Link>
      )}
    </AddActorPageLayout>
  );
};

export default withApollo()(AccountPage);
