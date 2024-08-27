/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef,useState } from 'react';
import { Box, Stack,Grid, Tooltip, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import RichTextEditorField from '../../components/fields/RichTextEditorField';
import ImageUploadField, { FileType } from 'components/fields/ImageUploadField';
import GooglePlacesField, { LocationType } from '../../components/fields/GooglePlacesField';
import DateTimePickerField from '../../components/fields/DateTimePickerField';
import LoadingButton from '@mui/lab/LoadingButton';
import AutocompleteField from 'components/fields/AutocompleteField';
import { gql, useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import RadioField from 'components/fields/RadioField';
import TextInputField from 'components/fields/TextInputField';
import UrlInputField from 'components/fields/UrlInputField';
import CheckboxField from 'components/fields/CheckboxField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InfoIcon from '@mui/icons-material/Info';
import RadioGroupForContext from './RadioGroupForContext';
import CustomRadioGroup from 'components/form/CustomRadioGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Entries from './Entries';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import StyledTreeItem from '../../components/filters/StyledTreeItem';
import SchedulerContainer from './BusinessHoursForm/SchedulerContainer';

const GET_USERS = gql`
  query users {
    users {
      id
      surname
      lastname
    }
  }
`;
const GET_ACTORS = gql`
query actors {
  actors {
    id
    name
  }
}
`;


type GET_USERS_TYPE = {
  users: {
    id: string;
    surname: string;
    lastname: string;
  }[];
};

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      code
      label
      multipleSelection
      position
      actor
      entries {
        id
        label
        icon
        color
        description
        subEntries {
          id
          label
          icon
          description
        }
      }
    }
  }
`;
export type EntriesWithInformation = {
    entryId: number
    linkDescription: string
    topSEO: boolean
};

export type ActorFields = {
  name : String
  email: String
  phone: String
  address: String
  postCode: String
  city: String
  website: String
  socialNetwork: String
  activity: String
  description: String
  lat: String
  lng: String
  entries: [String]
  entriesWithInformation: [EntriesWithInformation]
  shortDescription: String
  contactId: String
  volunteerDescription: String,
  siren: String
  hasVideoVouaaar: Boolean
  enableOpenData: Boolean
  memberOf: [String]
  referencingActor: String
  removeReferencingActor: Boolean
  logoPicture: FileType[];
  mainPicture: FileType[];
  pictures: FileType[];
  partners: FileType[];
  referents: string[];
};

type Props = {
  submitLabel: string;
  onSubmit: SubmitHandler<ActorFields>;
  loading?: boolean;
  defaultValues?: Partial<ActorFields>;
  additionalButton?: JSX.Element;
  showReferents?: boolean;
  referentsList?: { id: string; surname: string; lastname: string }[];
  disabledFields?: (keyof ActorFields)[];
};

const ActorForm = ({
  defaultValues,
  submitLabel,
  onSubmit,
  loading,
  additionalButton,
  showReferents,
  referentsList,
  disabledFields,
}: Props) => {
  const form = useForm<ActorFields>({
    mode: 'onTouched',
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const { data } = useQuery<GET_USERS_TYPE>(GET_USERS);
  const { data: datactors } = useQuery(GET_ACTORS, {});
  const previousStartedAt = useRef<string | null>();
  const startedAt = watch('startedAt');
  const endedAt = watch('endedAt');
  const showHours = watch('showHours');
  const volunteerAction = watch('volunteerAction');
  const [estlarochelle, setEstlarochelle] = useState(true);
  const errorMessages = Object.values(errors).map((e) => e.message);
  const [openingHours, setOpeningHours] = useState();
  
  const [dataCollections, setDataCollections] = useState({});
  const { loading: loadingCollections, error: errorCollections } = useQuery(
    GET_COLLECTIONS,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        setDataCollections(data);
      },
    },
  );

  const CollectionLabel = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: '2C367E',
    fontWeight: 600,
  }));

  const HelperText = styled(Typography)(({ theme }) => ({
    lineHeight: '1.66',
    fontSize: '0.75rem',
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'justify',
  }));

  const RootTree = styled(TreeView)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&:thover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  }));

  const TreeParent = styled(TreeItem)(({ theme }) => ({
    border: '1px solid #ccc!important',
    padding: '5px 0 5px 0',
    fontSize: '1.5em!important',
  }));
  const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
  }));

  const TitleContainer = styled(Grid)(({ theme }) => ({
    marginTop: 15,
    marginBottom: 10,
}));


  const TitleWithTooltip = (props: TitleWithTooltipProps) => {
    const { title, tooltipTitle, collection = false } = props;
  
    return (
      <TitleContainer
        container
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          color="primary"
        >
          {title}
        </Typography>
        {!!tooltipTitle && (
          <Tooltip title={tooltipTitle} color="primary">
            <InfoIcon />
          </Tooltip>
        )}
      </TitleContainer>
    );
  };

  // Change endDate if startDate change
  useEffect(() => {
    if (
      startedAt &&
      previousStartedAt.current &&
      endedAt &&
      !defaultValues?.['startedAt'] &&
      !defaultValues?.['endedAt']
    ) {
      const previousStartedAtDate = new Date(previousStartedAt.current);
      const startedAtDate = new Date(startedAt);
      const endedAtDate = new Date(endedAt);
      const diff = endedAtDate.getTime() - previousStartedAtDate.getTime();
      setValue('endedAt', new Date(startedAtDate.getTime() + diff).toISOString());
    }

    previousStartedAt.current = startedAt;
  }, [startedAt]);

  function IsTree(collection) {
    let isTree = false;
    if (collection.entries) {
      collection.entries.map((entry) => {
        if (entry.subEntries) {
          entry.subEntries.map((subentry) => {
            isTree = true;
            return isTree;
          });
        }
      });
    }
    return isTree;
  }
  const addLineBreaks = (string) => string.split('\n').map((text, index) => (
    <React.Fragment key={`${text}-${index}`}>
      {text}
      <br />
    </React.Fragment>
  ));

  useEffect(() => {
    const address = watch('address');
    if (address!= undefined && address.postcode === '17000') {
      setEstlarochelle(true);
    } else {
      setEstlarochelle(false);
    }
  }, [watch('address')]);

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 3 }}>
        <Stack direction="column" gap={3}>


        <TextInputField
            name="name"
            label="Nom de l'acteur"
            rules={{ required: "Nom de l'acteur requis" }}
          />

        <TextInputField
            name="email"
            label="Email"
            type="email"
            helperText={
              'Un email générique type "contact@structure.fr" est préférable à un mail nominatif type "prenom.nom@gmail.com" notamment pour limiter la pollution publicitaire des boites mail (robots parsant le web)'
            }
            rules={{ required: 'Email requis' }}
          />


        <TextInputField
            name="phone"
            label="Téléphone"
            type="tel"
            rules={{
              maxLength: { value: 10, message: 'Format du téléphone invalide. Maximum 10 chiffres.' },
            }}
          />

        <TextInputField
            name="socialNetwork"
            label="Réseau social"
          />  

          <UrlInputField
           name="website"
            label="Site Internet" />

          <TextInputField
            name="siren"
            label="Siren"
          />           
          <GooglePlacesField
            name="address"
            label="Ville"
            noOptionsText="Aucune ville trouvée"
            rules={{ required: 'Ville requise' }}
            disabled={disabledFields?.includes('address')}
          />


{
          /* @ts-ignore */
          dataCollections.collections &&
            /* @ts-ignore */
            dataCollections.collections.map((collection) => {
              if (collection.code !== 'larochelle_quarter' || !estlarochelle) {
                return '';
              }

              //    const [display, setDisplay] = useState(false);
              return (
                <div>
                  <br />
                  <CollectionLabel>
                    {collection.label}
                  </CollectionLabel>
                  {
                    // display &&
                    !IsTree(collection) && !collection.multipleSelection && (
                      <RadioField
                      name="entries"
                      label={collection.label}
                      options={collection.entries && collection.entries.map(entry => ({ value: entry.id, label: entry.label }))}
                      row={true} />
                    )
                  }
                </div>
              );
            })
        }
      

      {
          /* @ts-ignore */
          dataCollections.collections &&
            /* @ts-ignore */
            dataCollections.collections.map((collection) => {
              if (collection.code !== 'actor_status') {
                return '';
              }
              let { label } = collection;
              let helperText = '';

               label = 'Statut';
               helperText =
                'service public : toutes les collectivités, mairies, cda, cdc participant directement ou via des projets à la transition / ex : la rochelle territoire zéro carbone entreprise : tous les acteurs économiques de la transition, de l’economie sociale et solidaire... association & ONG  : toutes les structures à but non lucratif';
           
              //    const [display, setDisplay] = useState(false);
              return (
                <div>
                  <br />
                  <CollectionLabel>
                    {label}{' '}
                    {helperText !== '' && (
                      <Tooltip title={helperText}>
                        <InfoIcon />
                      </Tooltip>
                    )}
                  </CollectionLabel>
                  <br />
                  {
                    // display &&
                    !IsTree(collection) && !collection.multipleSelection && (
                      <RadioField
                      name="entries"
                      options={collection.entries && collection.entries.map(entry => ({ value: entry.id, label: entry.label }))}
                    
                      row={true}/>
                    )
                  }
                </div>
              );
            })
        }
        <p />
        <br />
 
        <TextInputField
      label="Activité principale de votre structure / Métier"
      name="activity"
      helperText="Indiquez ici l'activité principale ou votre métier si vous êtes seul dans la structure.  Cette info servira à mieux référencer votre page dans les moteurs de recherche. Ex : boulanger bio"
    />

          <TextInputField
            name="shortDescription"
            label="Description courte"
            helperText={
              'Cette description courte s’affichera en vue liste et dans les blocs de survol/clic de la carte.'
            }
            rules={{
              required: 'Description courte requis',
             }}
          />

          <RichTextEditorField
            name="description"
            label="Description longue"
            helperText={
              "Décrivez en une quinzaine de ligne les caractéristiques de votre structure, ce qui en fait un acteur important pour la transition locale : les objectifs, vos actions les plus importantes, des labels de qualité ou des récompenses, son histoire, le nombre d'employés, d'adhérents, vos atouts, vos souhaits ... Important : Pour que les utilisateurs vous trouve facilement, intégrez dans votre texte des mots-clés, nécessaires aux moteurs de recherche. Ex pour une recyclerie : zéro déchet - réutilisation - matériaux - économie circulaire - objet - vente, …"
            }
            rules={{
              required: "Description de l'activité requise",
            }}
          />

{
          /* @ts-ignore */
          dataCollections.collections
          /* @ts-ignore */
          && dataCollections.collections.map((collection) => {
            if (!collection.actor) return '';
            if (collection.code !== 'category') return '';
            //    const [display, setDisplay] = useState(false);
            let { label } = collection;
            let helperText;
            if (collection.code === 'category') {
              label = "Sujets d'actions principaux";
              helperText = 'Vous avez la possibilité d’ajouter un texte libre pour expliquer votre lien au sujet choisi. Vous pouvez sélectionner jusqu’a 3 sujet.';
            }
            let defaultValue = '';
            if (
              !IsTree(collection)
              && !collection.multipleSelection
              && formValues
              && formValues.entries
            ) {
              // @ts-ignore
              formValues.entries.map((entry) => {
                let isPresent = false;
                if (collection.entries) {
                  collection.entries.map((entryCollection) => {
                    if (entryCollection.id === entry) isPresent = true;
                    return isPresent;
                  });
                }
                if (isPresent) defaultValue = entry;
              });
            }
            return (
              <div key={collection.code}>
                <TitleWithTooltip
                  title={label}
                  tooltipTitle={helperText}
                  collection
                />
                {
                  // display &&
                  IsTree(collection) && (
                    <> 
                    <Entries>
                    
                      <RootTree
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                      >
                        {collection.entries
                          && collection.entries.map((entry) => {
                            return (
                              <>
                              <StyledTreeItem
                                key={entry.id}
                                nodeId={entry.id}
                                labelText={entry.label}
                                description={entry.description}
                                icon={entry.icon}
                                hideCheckBox
                                color={entry.color}
                                isForm
                                isParent
                                hasSubEntries={
                                  entry.subEntries
                                  && entry.subEntries.length > 0
                                }
                              >
                                {entry.subEntries
                                  && entry.subEntries.map((subEntry) => {
                                    return (
                                      <StyledTreeItem
                                        key={subEntry.id}
                                        // @ts-ignore
                                        nodeId={subEntry.id}
                                        labelText={subEntry.label}
                                        description={subEntry.description}
                                        icon={subEntry.icon}
                                        color={entry.color}
                                        isForm
                                      />
                                    );
                                  })}
                              </StyledTreeItem>
                              </>
                            );
                          })}
                      </RootTree>
                    </Entries>
                    </>
                  )
                }
              </div>
            );
          })
        }

<ImageUploadField
            name="logoPicture"
            label="Logo"
            filesLimit={1}
            dropzoneText="Déposez ici votre Logo principale au format jpg et de poids inférieur à 4Mo"
            sx={{ marginTop: 6 }}
          />
          <ImageUploadField
            name="mainPicture"
            label="Photo principale"
            filesLimit={1}
            dropzoneText="Déposez ici votre photo principale au format jpg et de poids inférieur à 4Mo"
            sx={{ marginTop: 6 }}
          />

          <ImageUploadField
            name="pictures"
            label="Autres photos"
            dropzoneText="Déposez ici vos autres photos au format jpg et de poids inférieur à 4Mo"
          />

<Label variant="body1" color="primary">
          Jour et horaire d'ouverture {' '}
          <Tooltip title={addLineBreaks('Pour chaque ligne vous pouvez : \n'
          + '1. Sélectionner les différents jours où vous êtes ouvert aux mêmes horaires. Le(s) jour(s) sélectionné(s) passe(nt) en bleu foncé.\n'
          + '2. Indiquer des tranches horaires associés à ce(s) jour(s). Vous pouvez ajouter autant de tranches horaires que nécessaire pour le(s) même(s) jour(s) en cliquant sur la phrase « ajouter des horaires »\n'
          + '3. Ajouter un lieu à chaque ligne. Vous n’avez pas d’adresse fixe mais êtes mobile de manière récurrentes, en cliquant en haut sur « indiquer des emplacements », c’est possible ! Attention néanmoins, pour les rdv spéciaux qui ne sont pas hebdomadaires ou les marchés… nous vous invitons à créer par la suite des pages événements dédiés à chacune de vos actions. Ces pages événements vous permettront de donner plus d’infos aux visiteurs et d’être visible dans l’agenda. Pour ajouter un lieu, indiquez l’adresse dans l’espace dédié et cliquez n’importe où sur l’écran pour valider. L’adresse s’affichera alors dans un bloc grisé.\n'
          + '4. une erreur ? un horaire qui n’existe plus ? Tout est modifiable et, si besoin, vous pouvez totalement supprimer la ligne grâce à l\'icone poubelle\n\n'
      + 'Vous avez rempli votre 1ere ligne mais il vous reste d’autres jours à indiquer ? Cliquez sur le + et ajoutez autant de ligne que nécessaire\n')}>
            <InfoIcon />
          </Tooltip>
        </Label>
        <HelperText >Si vous faites de l’accueil du public, ou si vous avez un standard téléphonique</HelperText>
        <SchedulerContainer onChange={setOpeningHours} />
          

{
          /* @ts-ignore */
          dataCollections.collections &&
            /* @ts-ignore */
            dataCollections.collections.map((collection) => {
              if (!collection.actor) return '';
              if (collection.code === 'larochelle_quarter') return '';
              if (collection.code === 'actor_status') return '';
              if (collection.code === 'category') return '';


              //    const [display, setDisplay] = useState(false);
              let { label } = collection;
              let helperText = '';
              if (collection.code === 'public_target') {
                label =
                  'Public';
                helperText =
                  'Ici nous vous proposons de choisir votre public principal. Bien sûr à chaque action (événement, campagne…) que vous créerez vous pourrez indiquer des publics différents. de votre public principal. Tout public = familles ; Jeunes adultes = 15-25 ans, étudiants ; précaires = SDF, familles en difficulté, etc. ; discriminés = femmes, LGBTQIA+, migrants, etc';
              } else if (collection.code === 'collectif') {
                label =
                  'Membre de réseaux :';
                helperText =
                  'Sont référencés ici les réseaux du territoire. Les groupes locaux de réseaux nationaux (ex Greenpeace) ne sont pas inclus dans cette liste';
              } else if (collection.code === 'actor_location_action') {
                label = "Périmètre d'action (1 seul choix) *";
                helperText =
                  'Si vous êtes une antenne, le territoire d’action est celui qui concerne votre structure chapeau (ex : Greenpeace, choisir « International »)';
              }

              return (
                <div>
                  <br />
                  <CollectionLabel>
                    {label}{' '}
                    {helperText !== '' && (
                      <Tooltip title={helperText}>
                        <InfoIcon />
                      </Tooltip>
                    )}
                  </CollectionLabel>
                  <br />

                  {
                    // display &&
                    !IsTree(collection) && collection.multipleSelection && (
                      <Stack direction={{ xs: 'column', md: 'column' }} spacing={2} justifyContent="center">
                        {collection.entries &&
                          collection.entries.map((entry) => {
                            return (
                              <CheckboxField
                                  name="entries"
                                  label={entry.label}
                                  value={entry.id}
                                />
                            );
                          })}
                      </Stack>
                    )
                  }
                  {
                    // display &&
                    !IsTree(collection) && !collection.multipleSelection && (
                      <RadioField
                      name="entries"
                      label={collection.label}
                      options={collection.entries && collection.entries.map(entry => ({ value: entry.id, label: entry.label }))}
                      row={true}
                    />
                    )
                  }
                </div>
              );
            })
        }



<RichTextEditorField
            name="volunteerDescription"
            label="Nos recherches en bénévolat"
            helperText={
              "Décrivez ici les missions de bénévolat générales chez vous ou sur un devos projets spécifiques afin de donner envie aux visiteurs de cliquer sur «je deviens bénévole» de votre page."}
          />


        <br />
{
            <AutocompleteField
              name="memberOf"
              label="Fait partie du collectif (Acteur existant sur OUAAA!)"
              multiple
              options={( datactors?.actors || []).map((u) => ({
                id: u.id,
                label: `${u.name}`,
              }))}
              disabled={disabledFields?.includes('referents')}
            />
          }

          <Tooltip title={errorMessages.length > 0 ? errorMessages.map((e) => <div>{e}</div>) : ''} arrow>
            <Box sx={{ margin: 'auto' }}>
              <LoadingButton disabled={errorMessages.length > 0} loading={loading} type="submit" variant="contained">
                {submitLabel}
              </LoadingButton>
            </Box>
          </Tooltip>

          {additionalButton}
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default ActorForm;
