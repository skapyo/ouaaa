import React from 'react';
import AppLayout from 'containers/layouts/AppLayout';
import {
  Box,
  Container,
  makeStyles,
  RootRef,
  Typography,
} from '@material-ui/core';
import Link from 'components/Link';
import Newsletter from '../../containers/layouts/Newsletter';

const useStyles = makeStyles((theme) => ({
  align: {
    'text-align': 'center',
    width: '90%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '5em',
    },
  },
  space: {
    margin: '4em 0 4em 0',
  },
  justify: {
    'text-align': 'justify',
  },
}));
const About = () => {
  const styles = useStyles();
  return (
    <AppLayout>
      <RootRef>
        <Box>
          <Container className={styles.align}>
            <Typography variant="h1">A propos</Typography>
            <div className={styles.space}> </div>

            <Typography className={styles.justify}>
              <div>
              Après diverses rencontres, échanges et enquêtes, le constat est unanime : beaucoup d’acteurs novateurs et engagés  dessinent une alternative au modèle de société, fournissent et proposent des solutions. Confidentiels, ces acteurs et leurs actions manquent de visibilité auprès des publics : habitants, jeunes, précaires, professionnels… Les changements de mode de travail, accéléré par le contexte sanitaire, ont révélé le besoin d’outils collaboratifs en distanciel pour créer et développer des synergies inter-acteurs.
              </div>
              <br />
              <div>
              Le 1er confinement dû au Covid-19 en mars 2020, a été le déclencheur pour nous retrousser les manches. "Nous", c'est une vingtaine de bénévoles issus de divers collectifs associatifs (Collectif Transition Citoyenne, Collectif Actions Solidaires, Tiers Lieu La Proue) ainsi que des citoyennes et citoyens engagés. 
              </div>
              <br />
              <div>
              C'est ainsi qu'est né le site « OUAAA! -  Agir pour la transition en Aunis » 
Au fait, pourquoi ce nom ? A l’origine, c’était un acronyme pour : Outils des Acteurs Alternatifs en Aunis. Pour nous, c'est surtout l’effet wOUAAAw !
              </div>
              <br />
             <b>wOUAAAw, un projet local !</b> <br /> <br />
             <div>Logo_OUAAA
             Si le web n’a, par principe pas d’échelle géographique, notre projet a lui un territoire défini intégrant les communautés de communes Aunis Atlantique, Aunis Sud, Île de Ré et l’agglomération de La Rochelle. Cet échelon permet des liens entre zone urbaine et communes rurales pour, par exemple construire une filière agricole vivrière avec les paysans et les consommateurs. C’est aussi les choix pris pour le SCOT, le plan alimentation ou encore celui du projet de monnaie locale « la trémière ». Un territoire résilient !
              </div>
              <br />
             <b>wOUAAAw, un projet inclusif ! </b> <br /> <br />
             <div>
             OUAAA! souhaite promouvoir tous les acteurs oeuvrant pour la transition, valoriser leurs actions et les mobiliser pour sortir de l’entre soi. Ces acteurs peuvent-être des particuliers, associations, ONG, entreprises ou des services publics.
Notre plateforme s’adresse à tous les habitants de l’Aunis : le jeune public, les ados, les étudiants, les femmes, les seniors, les professionnels, les publics précaires, discriminés…
              </div>
              <br />
             <b>wOUAAAw, un projet engagé !</b> <br /> <br />
             <div>
             Plateforme d’information et d’engagement, OUAAA! veut accélérer la transition vers un fonctionnement plus sobre, plus humain et véritablement « durable ». Nous définissons la transition écologique et sociale comme une évolution vers une société plus juste qui répondrait aux besoins de chacun dans une sobriété propice à la préservation de notre environnement. Sur la base des <Link href="/odd">Objectifs de Développement Durable de l’ONU </Link>, nous avons développé notre propre arborescence en 4 thématiques et 21 sujets pour inclure la diversité des acteurs et actions concernés par la transition.
              </div>
              <br />
             <b>wOUAAAw, un projet coopératif ! </b> <br /> <br />
             <div>
             Animé par une équipe essentiellement bénévole : sans but lucratif, le site est développé sur la base d’outils libres. Il est utilisable et clonable pour d’autres projets similaires sur d’autres territoires. Nos développeurs ont porté une attention particulière à l’impact écologique de notre site web et à son accessibilité à tous. 
A l’écoute des usagers : acteurs inscrits et visiteurs du site, nous recueillons leurs besoins et idées afin d’améliorer l’expérience utilisateurs et proposer de nouvelles fonctionnalités.
          <br />
          
          <br />
          <b>wOUAAAw, ils s’engagent à nos côté !  </b> <br /> <br />
            <img width ="200px" src ="https://static.ouaaa-transition.fr/static/images/actor/32/32-9WylkfPt1K-original.jpeg" alt="Aunis en transition" />
          Porté par le collectif Aunis en Transition : l'association reprend le flambeau du Collectif Transition Citoyenne Pays Rochelais avec la volonté de fédérer les acteurs de tout l'Aunis, échelle cohérente pour organiser un territoire résilient. Son ambition est la suivante : Créer du lien entre les acteurs de la transition, favoriser leur coopération, les faire mieux connaitre du grand public.
          <br />
          <br />
          <br />
            <img width ="200px" src ="https://www.larochelle-zerocarbone.fr/lr-zerocarbone-theme/images/logo-zerocarbone-fill.svg" alt="La Rochelle Territoire Zéro Carbone" />
            Partenaire de La Rochelle Territoire Zéro Carbone projet initié par cinq entités fondatrices et 130 organismes impliqués, entreprises, associations, collectifs, collectivités, LRTZC se décline sous forme d’actions comme c’est le cas de ouaaa-transition.fr ! L’enjeu : préparer la ville de demain, pour un territoire sans carbone en 2040. 
            <br />
            <br />
            <br />
            <img width ="200px"  src ="https://www.insightnest.fr/wp-content/uploads/2021/07/logo_full_dark_439.png" alt="Insighnest" />
            Basé à La Rochelle, réseau d’indépendants, Insightnest a été d’une grande utilité pour réussir à vous proposer ouaaa-transition.fr en venant renforcer notre équipe de développeurs web bénévoles
              </div>
              </Typography>
            <br />
            <br />
            <br />
            <br />
          </Container>
        </Box>
      </RootRef>
    </AppLayout>
  );
};

export default About;
