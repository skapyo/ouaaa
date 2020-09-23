import React from "react"
import AppLayout from "containers/layouts/AppLayout"
import {
    Typography,
    makeStyles,
    Box,
    Container,
    RootRef,
} from "@material-ui/core"
import { useState, useEffect } from "react"
import Newsletter from "../../containers/layouts/Newsletter";

const useStyles = makeStyles((theme) => ({

    container:{

        "padding": "10em",
    },
    align:{
        "text-align": "center",
    }




}))
const Charter = () => {
    const styles = useStyles(stylesProps)
    const [stylesProps, setStylesProps] = useState({
        topImageSize: "250px",
        headerDisplay: "static",
    })
    return (
        <AppLayout>
            <RootRef >
                <Box>
                    <Container className={styles.container} >
                        <div className={styles.align}>
                            <Typography variant="h1" >Charte</Typography>

                        </div>
                        Sommaire
                        <div>1. L’esprit du site</div>
                        <div>2. Les objectifs et les usages en fonction des utilisateurs</div>
                        <div>3. La définitions des acteurs</div>
                        <div>4. La gouvernance</div>
                        <div></div>
                        <p></p>
                        <Typography variant="h5" >1. L'esprit du site :</Typography>

                        <p>
                            <div>• Ce site ambitionne d'être un outil au service de la transition citoyenne en Aunis.</div>
                            <div>«La transition citoyenne est un mouvement global pour inventer ensemble un monde économiquement viable, socialement responsable et écologiquement soutenable : une transition non-violente vers des sociétés du bien-vivre par l'éducation, la culture, les échanges fraternels et la recherche de l'intérêt général.» (extrait de la charte du Collectif National pour la Transition).</div>
                        </p>
                        <p>
                            • En effet, des initiatives locales donnent des réponses concrètes et pertinentes à des crises majeures : changement climatique, écroulement de la biodiversité, pollutions, gaspillage et surexploitation des ressources, repli sur soi, financiarisation de l’économie et bulles spéculatives, etc... Elles apportent des solutions ici et maintenant grâce à des agriculteurs, associations, collectivités, entrepreneurs, citoyens qui s’engagent dans des voies nouvelles. Ces solutions une fois démultipliées, mises en réseau, rendues accessibles à tous, forment un projet de société nouvelle et désirable.
                            Ce site se propose de présenter ces initiatives et d'inviter chacun à s'engager pour "être ce changement que nous souhaitons pour le monde" - en partant de l'Aunis.
                            Pour répondre à ces intentions, il souhaite devenir le site de référence proposant une synthèse claire, accessible, globale, de confiance, pour trouver les informations utiles sur notre territoire. Il doit donc se construire en tenant compte de l'ensemble des acteurs et usagers, proposer des solutions aux besoins quotidiens de base comme aux aspirations les plus engagées.
                        </p>

                        <Typography variant="h5" >2. Les objectifs :</Typography>
                        <p>
                            <div>C'est un outil d'orientation vers les acteurs locaux, d'information sur la transition et ses thèmes, et de coordination des initiatives :</div>
                            <div>En tant que citoyen.ne, vous pouvez grâce au site :</div>
                            <div>• Situer les acteurs proches de chez vous grâce à une carte et les découvrir dans les fiches détaillant leurs activités</div>
                            <div>• Être au courant des événements grâce à l'agenda participatif</div>
                            <div>• Contacter directement les acteurs si vous souhaitez vous engager</div>
                            <div>• Etre informé.e des événements ou actions organisés par les acteurs en vous abonnant à l'infolettre</div>
                            <div>• Prendre connaissance des idées d'actions et en proposer</div>
                            <div>• Trouver des solutions concrètes à vos préoccupations les plus quotidiennes.</div>
                        </p>
                        <p>
                            En tant qu'acteur de la transition, vous pouvez :
                            <div>• Présenter vos actions et vous faire connaître davantage</div>
                            <div>• Utiliser la page web qui vous est dédiée comme votre site internet, ou renvoyer à cette page depuis votre propre site</div>
                            <div>• Sur une partie réservée du site, vous pourrez entrer en contact, coordonner vos actions, partager vos bonnes pratiques et connaissances avec les autres acteurs</div>
                        </p>

                        <Typography variant="h5" >3. La définition des acteurs :</Typography>
                        <p>Les acteurs que nous référençons sont de tous types : citoyens, associations, collectifs, professionnels du secteur public ou privé.
                            <div>Ils interviennent pour améliorer, expérimenter, réinventer la société sur un ou plusieurs sujets d’une des thématiques suivantes :</div>
                            <div>• l'économie sociale et solidaire, l'emploi par le soutien aux circuits locaux</div>
                            <div>• les modes de consommation, d'échanges de biens et de services</div>
                            <div>• la production locale d'une alimentation saine pour les consommateurs et pour l'environnement,</div>
                            <div>• l’habitat (écoquartier et écohabitat)</div>
                            <div>• la mobilité (transport doux et collectif)</div>
                            <div>• l'énergie (économies d'énergie et énergies renouvelables)</div>
                            <div>• l’environnement, la valorisation de nos paysages, la protection des sols, de l'eau, de la biodiversité, de la place des végétaux et de l'arbre,</div>
                            <div>• le réemploi, l'économie circulaire, la réduction et la gestion des déchets,</div>
                            <div>• la solidarité, le vivre ensemble, les liens intergénérationnels</div>
                            <div>• les projets éducatifs, artistiques, de concertation citoyenne pour apprendre et agir, l’éducation populaire</div>
                            <div> • le numérique au service de la transition</div>
                            <div>• la réflexion et la sensibilisation sur les thèmes majeurs de la transition (démocratie, justice sociale au niveau local et global, environnement et système économique mondial).</div>
                        </p>
                        Exemples : AMAP, éco-construction, producteurs locaux, vente à la ferme, artisanat, recyclage, compostage, cuisine bio ou végétarienne, écoles ou crèches engagées dans des pédagogies novatrices, systèmes d'échanges non monétaires, jardins partagés, jardins d'insertion, éco-gîtes, tiers-lieux, associations d'éducation populaire, de promotion de l'autonomie alimentaire, de mobilité douce, de l'ESS, de défense de l'environnement, de défense des droits de l'homme.
                        <p>
                            <div> Dans un souci de neutralité et de précaution, nous appliquons les restrictions suivantes :</div>
                                <div> • Les structures nationales ou internationales devront avoir une succursale en Aunis.</div>

                                    <div>• Les prestations de soin, santé, bien-être, massages, induisant des relations humaines d'une teneur particulière (confiance, intimité, ascendant moral, influence) entre les prestataires et leurs clients : nous préférons par précaution ne pas les référencer.</div>

                                        <div> • Il en va de même pour les activités de développement personnel ou de coaching.</div>

                                            <div> • Neutralité : la carte ne référence pas les partis politiques, associations dépendantes de partis ou mouvements à caractère partisan ou prosélyte. Toutefois des actions organisées par ce type d'organisations pourront être annoncées dans l'agenda si leur objectif coïncide avec les nôtres.</div>
                        </p>
                        La Plateforme affirme son refus d’intégrer toute pratique violente, discriminatoire, anti-démocratique, sexiste, homophobe, xénophobe ou raciste.
                        <p></p>
                        <Typography variant="h5" > 4. La Gouvernance :</Typography>


                        <p>Les inscriptions sur la plate-forme sont soumises à un comité de pilotage élu parmi les acteurs. Celui-ci délibère et dans le cas d’un refus, motive sa décision.

                            <div> Suppression / modification des informations : nous nous laissons la possibilité de modifier des informations si elles sont erronées et de supprimer un acteur si celui-ci n'est plus en activité ou s’il contrevient à la charte.</div>

                                <div>  Protection de la vie privée : les personnes qui proposent des acteurs s'engagent à ne fournir que les coordonnées publiques desdits acteurs : sites web, emails, téléphones, adresses…</div>

                                    <div> Nous nous engageons à respecter le RGPD.</div>

                                        <div> Révision de la charte</div>

                                            <div>Cette charte est adoptée par le groupe de préfiguration du site en réunion plénière du 26 juin 2020. Elle est révisable sur demande du quorum du futur comité de pilotage.</div>
                        </p>
                    </Container>
                    <Newsletter />
                </Box>
            </RootRef>
        </AppLayout>
    )
}

export default Charter
