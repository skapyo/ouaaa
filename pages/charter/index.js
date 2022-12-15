import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import { Box, Container,  Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    [theme.breakpoints.down('lg')]: {
      paddingTop: '5em',
    },
   
  },
  align: {
    'text-align': 'center',
  },
}));
const Charter = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <>
        <Box>
          <Container className={styles.container}>
            <div className={styles.align}>
              <Typography variant="h1">Charte</Typography>
            </div>
            Sommaire
            <div>1. L'esprit du site et ses objectifs </div>
            <div>
              2. Les usages en fonction des usagers 
            </div>
            <div>3. Qui peut s’inscrire ?</div>
            <div>4. La gouvernance</div>
            <div />
            <p />
            <Typography variant="h5">1. L'esprit du site et ses objectifs  :</Typography>
            <p>
              <div>
              «La transition citoyenne est un mouvement global pour inventer ensemble un monde économiquement viable, socialement responsable et écologiquement soutenable : une transition non-violente vers des sociétés du bien-vivre par l'éducation, la culture, les échanges fraternels et la recherche de l'intérêt général.» (extrait de la charte du Collectif National pour la Transition).
              </div>
              <br/>
              <div>
              Des initiatives locales donnent des réponses concrètes et pertinentes à des crises majeures : changement climatique, écroulement de la biodiversité, pollutions, gaspillage et surexploitation des ressources, repli sur soi, financiarisation de l’économie et bulles spéculatives, etc. Elles apportent des solutions ici et maintenant grâce à tous ceux qui participent à la transition / s’engagent dans des pratiques alternatives. Ces solutions une fois démultipliées, mises en réseau, rendues accessibles à tous les citoyens-habitants-usagers, forment un projet de société nouvelle et désirable.
              </div>
              <br/>
              <div>
              Site internet collaboratif généraliste :  ouaaa-transition.fr ambitionne d’accélerer la transition écologique, sociale et citoyenne en Aunis. En valorisant les acteurs et leurs actions, le site invite chacun à  participer pour "être ce changement que nous souhaitons pour le monde". Pour répondre à ces enjeux, il souhaite devenir le site de référence proposant une synthèse claire, accessible, globale, de confiance, pour trouver les informations utiles sur notre territoire. Il  se construit en tenant compte de l'ensemble des acteurs et usagers, propose des solutions aux besoins quotidiens comme aux aspirations les plus engagées.
              </div>
              <br/>
              <div>
              OUAAA! affirme son refus d’intégrer toute pratique violente, discriminatoire, anti-démocratique, sexiste, homophobe, xénophobe ou raciste.   </div>
            </p>
            
            <Typography variant="h5">2. Les usages en fonction des usagers :</Typography>
            <p>
              <div>
              En tant qu’utilisateur, vous pouvez grâce aux fonctionnalités actuelles du site :
              </div>
                <div>
                • Voir les acteurs proches de chez vous grâce à une carte 
              </div>
              <div>
                • Trouver des solutions concrètes à vos besoins grâce à notre filtre
              </div>
              <div>
                • Être au courant des événements grâce à l'agenda
              </div>
              <div>
                • Contacter directement les acteurs si vous souhaitez vous engager
              </div>
            </p>
            <p>
            En tant qu'acteur de la transition, vous pouvez actuellement :
              <div>
                • Etre visible et référencé sur notre carte 
              </div>
              <div>
                • Présenter vos actions, actualités et événéments
              </div>
              <div>
                • Utiliser la page web qui vous est dédiée comme votre site internet, ou renvoyer à cette page depuis votre propre site
              </div>
            </p>
            <div>
            Dans un esprit collaboratif, de nouvelles fonctionnalités viendront s'ajouter réguliérement. Elles seront basées sur les besoins des utilisateurs et acteurs de OUAAA!
              </div>
              <br/>
            <Typography variant="h5">3. Qui peut s’inscrire ?</Typography>
            <p>
            Dans un principe de neutralité, tous les types d’acteurs (particuliers, associations & ONG, entreprises, entreprises coopératives et services publics) peuvent intégrer OUAAA! S’ils : 
            <div>
                • ont manifesté leur accord avec les valeurs de la charte
              </div>
              <div>
                • sont basés en AUNIS (défini comme le regroupement des communautés de communes : Aunis Atlantique, Aunis Sud, Île de Ré et agglomération de La Rochelle) ou y ont une succursale
              </div>
              
            </p>
              Les acteurs référencés interviennent pour améliorer, expérimenter et réinventer la société.
            <p>
            <Typography variant="h5">Ne seront pas référencés :</Typography>
            <div>
                • Les prestations de soin, santé, bien-être, massages, développement personnel ou de coaching induisant des relations humaines d'une teneur particulière (confiance, intimité, ascendant moral, influence) entre les prestataires et leurs clients 
              </div>
              <div>
                • Les partis politiques, associations dépendantes de partis ou mouvements à caractère partisan ou prosélyte
              </div>
              
            </p>
            <p />
            <Typography variant="h5"> 4. La Gouvernance :</Typography>
            <p>
            • Les inscriptions d’acteurs sont soumises à vérification du respect de notre charte
              <div>
              • Un acteur peut être exclu du site si ses pratiques contreviennent à la charte.
              </div>
              <div>
              • Nous nous laissons la possibilité de supprimer un acteur si celui-ci n'est plus en activité ou inactif sur le site pendant une période prolongée.
              </div>
              <div>
              • Les acteurs sont responsables des contenus  (page acteur, pages événements) qu’ils créent.
              </div>
              <div>
              • Ils s'engagent à ne fournir que les coordonnées publiques desdits acteurs : sites web, emails, téléphones, adresses postales, etc.
              </div>
              <div>
              • Nous nous réservons le droit de modifier une information erronée.
              </div>
              <div>
              • OUAAA! s’engage à respecter le règlement général sur la protection des données (RGPD).
              </div>
              <br/>
              <div>
                {' '}
                Une gouvernance participative (composée d’acteurs et utilisateurs) permet de développer OUAAA!, fixer ses objectifs, réfléchir à son orientation et gérer les différents aspects afférents.
              </div>
             
              <div>
              ouaaa-transition.fr est porté juridiquement par le Collectif Aunis En Transition (loi 1901, AET).
Cette charte est adoptée le 13.10.2021
              </div>
            </p>
          </Container>
        </Box>
      </>
    </AppLayout>
  );
};

export default Charter;
