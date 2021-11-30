import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import Link from 'components/Link';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Newsletter from '../../containers/layouts/Newsletter';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '5em',
    },
   
  },
  align: {
    'text-align': 'center',
  },
}));
const Faq = () => {
  const styles = useStyles();

  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container className={styles.container}>
            <div className={styles.align}>
              <Typography variant="h1">Foire aux questions</Typography>
            </div>
            <br />
            {' '}
            <br />
            <div>
              <Typography variant="h2">Comment créer mon compte sur OUAAA! ?</Typography>
              <br />
              1. Dans le menu haut de votre écran, cliquez sur
              {' '}
              <PersonOutlineIcon />
              {' '}
              puis sur le bouton
              {' '}
              <img src="/image/creer_compte.png" width="40%" />
              {' '}
              ou par
              {' '}
              <Link href="/signin"> ici</Link>
              <br />
              <br />
              2. Par soucis de cybersécurité, nous avons choisi un système mot de passe complexe devant contenir : au moins 8 caractères, au moins une majuscule, au moins une minuscule, au moins un chiffre, au moins caractère spécial, sans aucun espace
              <br />
              <br />
              3. Un mail de confirmation vous sera envoyé pour valider votre adresse mail
              <br />
              <br />
              4 C’est parti !
            </div>
            <br />
            <br />
            <div>
            <Typography variant="h2">A quoi va me servir mon compte sur ouaaa-transition.fr  ? </Typography>
              <br />
              <br />
              En ayant un compte personnel vous pouvez dès maintenant : créer une ou plusieurs pages acteurs pour parler de structure(s) agissant pour la transition écologique et citoyenne en Aunis
              <br />
              Prochainement vous pourrez aussi : ajouter des acteurs comme favoris pour les retrouver plus facilement, indiquez que vous souhaitez participer à une action proposée dans l’agenda, souscrire à l’info lettre d’un acteur en particulier, indiquer votre envie de devenir bénévole...
            </div>
            <br />
            <Typography variant="h2">Qu’appelle-t-on un acteur de la transition écologique et sociale ? </Typography>
            <br />
            <br />

            Tous les Particuliers, association & ONG, entreprises, entreprises coopératives et services publics. intervienant pour améliorer, expérimenter, réinventer la société. Il s’intégre dans une ou plusieurs des 4 thématiques suivantes et parmi les 21 sujets associés

            <ul>
              <li> vivre mieux : Éducation, Formation ; Culture, loisirs, médias ; Santé, bien-être ; Alimentation ; Autres biens et services</li>
              {' '}
              <br />
              <li>vivre ensemble : Solidarité, humanisme ; droits, justice, égalité ; économie, finance ; citoyenneté, démocratie ; recherches et savoirs</li>
              {' '}
              <br />
              <li>produire mieux : agriculture, production ; industrie, transformation ; recyclage, déchets ; mobilité, transports ; énergie</li>
              {' '}
              <br />
              <li>vivre avec la planète : air et climat ; eau ; sol et sous-sol ; biodiversité ; paysages et écosystèmes</li>
              {' '}
              <br />
            </ul>
            <br />
            <br />
            <Typography variant="h2">Y a t il des acteurs qui ne peuvent pas s’inscrire sur  ouaaa-transition.fr ?</Typography>
            <br />
            <ul>
              <li>Les structures nationales ou internationales n’ayant pas succursale sur le territoire de l’Aunis (défini comme le regroupement des communautés de communes : Aunis Atlantique, Aunis Sud, Île de Ré et agglomération de La Rochelle) </li>
              <br />
              <li>Les prestations de soin, santé, bien-être, massages, développement personnel ou de coaching induisant des relations humaines d'une teneur particulière (confiance, intimité, ascendant moral, influence) entre les prestataires et leurs clients. </li>
              <br />
              <li>Les partis politiques, associations dépendantes de partis ou mouvements à caractère partisan ou prosélyte. </li>
              <br />
              <li>Les acteurs ayant une pratique discriminatoire, anti-démocratique, sexiste, homophobe, xénophobe ou raciste.</li>
              <br />
            </ul>

            <Typography variant="h2">C’est où l’Aunis ?</Typography>
            <br />
            Pour OUAAA!, l’Aunis est défini comme le regroupement des communautés de communes Aunis Atlantique, Aunis Sud, Île de Ré et de l’agglomération de La Rochelle
            <br />
            <br />
            <Typography variant="h2">Comment remplir ma page acteur ?</Typography>
            <br />
            1. Vous devez en premier lieu avoir créer un compte personnel
            <br />
            2. Rendez vous sur <Link href= "/addactor">la page ajouter un acteur</Link>
            <br />
            3. Vous confirmer, en cochant la case dédiée, que vous respecter la charte OUAAA ! 
            <br />
            4. Des infos bulles sont insérées dans chaque étape de la création-édition d’une page acteur. Retrouvez les facilement en cliquant sur  <InfoIcon />
            <br />
            A minima vous devrez remplir les champs obligatoire marquée d’une *
       Cependant plus votre fiche sera remplie et plus les internautes recevront une information fiable et claire.
       
       <br />
       <br />
       <Typography variant="h2">Est ce que je peux créer plusieurs pages acteurs avec mon compte personnel ? </Typography>
       <br />
       Oui ! Votre compte personnel n’appartient qu’à vous, il est invisible sur le site. Il vous permet de créer autant de page que vous souhaite administrer 
       <br />
       <br />
       <Typography variant="h2">Comment peut on co-administrer une page acteur ?</Typography>
       <br />
       On le sait dans de nombreuses structures, il y a souvent plusieurs intervenants sur les missions de communication. On a tout prévu, en fin de page vous trouverez la rubrique « référent associé à l’acteur » vous pouvez alors ajouter vos coadministrateurs simplement en tapant leur prénom – nom. Notre moteur de base de donnée associe alors leur compte personnel à la page acteur. Une seule condition donc pour ajouter un co-administrateur, il doit déjà avoir créé compte personnel 
        
          <br />
          <br />
          <Typography variant="h2">Comment supprimer ma page acteur ? </Typography>
          <br />
          Vous pouvez supprimer une page acteur par le bouton se trouvant en fin de page dans l’éditeur . Attention cette action, après confirmation, est irréversible. Toutes les données associées à l’acteur comme les actions et événements seront eux aussi perdus
        
          <br />
          <br />
          <Typography variant="h2">Comment supprimer mon compte personnel ?  </Typography>
          <br />
          Depuis l’onglet mon compte accessible en haut à droite, dans l’espace info personnelles, retrouvez en bas un bouton supprimer mon compte : un pop up de confirmation s’ouvre. Une fois la demande valider vous ne pourrez plus revenir en arrière. Si vous êtes administrateur de page acteur assurez vous que d’autre administrateur ont la main. Si vos pages sont amenées à disparaître elles aussi, nous vous invitons à supprimer chaque page avant de supprimer votre compte personnel
        
        
          <br />
          <br />
          <Typography variant="h2">Comment supprimer une action-événement ?   </Typography>
          <br />
          Depuis l’onglet mon compte accessible en haut à droite, dans l’espace info personnelles, retrouvez en bas un bouton supprimer mon compte : un pop up de confirmation s’ouvre. Une fois la demande valider vous ne pourrez plus revenir en arrière. Si vous êtes administrateur de page acteur assurez vous que d’autre administrateur ont la main. Si c’est page sont amenées à disparaître elles aussi, nous vous invitons à supprimer chaque page avant de supprimer votre compte personnel
        
          <br />
          <br />
          <Typography variant="h2">Comment supprimer une action-événement ? </Typography>
          <br />
          En fin du formulaire d’édition vous trouverez un bouton « supprimer l’événement » une fenêtre de confirmation vous demandera de vous assurez que vous vouliez bien supprimer cette action. Attention, valider cette requête entraînera la suppression définitive de l’action
        
          <br />
          <br />
          <Typography variant="h2">Mes données seront elles utilisées par des tiers ? </Typography>
          <br />
          En aucun cas nous diffuserons vos données à des tiers. Elles ne serviront qu’à deux choses : 
          <br />
          1. fournir vos coordonnées à un acteur précis lorsque vous indiquez vouloir mettre un acteur en favori, participer à une action ou devenir bénévole. C’est logique, l’acteur pourra ainsi vous tenir informé en direct !
          <br />
          2. utiliser en interne pour nos statistiques : savoir quelles sont les pages les plus consultées, par quels moyens vous êtes arrivé chez nous, etc. Tout cela est anonyme. En apprenant à vous connaître, nous pourrons améliorer votre expérience de OUAAA!

          <br />
          <br />
          <Typography variant="h2">Comment remplir mon agenda acteur? </Typography>
          <br />
          Le plus simplement du monde, en ajoutant des action-événément : 
          <br />
          1. Connectez-vous sur votre compte personnel (si ce n’est pas le cas)
          <br />
          2. Vous devez en premier lieu avoir créée une page acteur
          <br />
          3. Rendez-vous sur votre page acteur et au niveau du calendrier cliquez sur : « ajouter un événement »
          <br />
          4. Des infos bulles sont insérées dans chaque étape de la création-édition d’une page événement Retrouvez les facilement en cliquant sur   <InfoIcon />
          <br />
          5. Remplissez le maximum d’infos pour donner envie au visiteur de participer à votre non-événement
          <br />
          <br />
          </Container>
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default Faq;
