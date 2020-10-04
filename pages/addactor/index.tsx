import {Container, createStyles, makeStyles, Theme, Typography} from "@material-ui/core"
import {withApollo} from 'hoc/withApollo'

import ClassicButton from "components/buttons/ClassicButton"
import AddActorForm from "containers/forms/AddActorForm"
import AddActorPageLayout from "containers/layouts/addActorPage/AddActorPageLayout"
import graphqlTag from 'graphql-tag'
import TreeItem, {TreeItemProps} from '@material-ui/lab/TreeItem';
import {useQuery} from "@apollo/react-hooks";
import Link from "../../components/Link";
import React, {useCallback} from "react";
import Icon from '@material-ui/core/Icon';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {useSessionState} from 'context/session/session';
import {useRouter} from "next/router";
import {useCookies} from 'react-cookie'

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
const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
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

    }),
);

function StyledTreeItem(props: StyledTreeItemProps) {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <Icon>{labelIcon}</Icon>
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>

                </div>
            }
            style={{
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
    avatar : {
        width: '200px',
        height: '200px',
        marginBottom : theme.spacing(4)
    },
    userInfosTitle : {
        marginBottom : theme.spacing(5),
    },
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
    },
    buttonAuthentification:{
        backgroundColor: "#bf083e!important",
    },
    registerInfo:{
        padding:"2em",
    }

}))

const GET_CATEGORIES = graphqlTag`
    { categories
    {   id,
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

    const styles = useStyles()
    const classes = useTreeItemStyles();
    const [cookies, setCookie, removeCookie] = useCookies();
    const router = useRouter()
    const {data,loading,error} = useQuery(GET_CATEGORIES,{fetchPolicy:"network-only"});

    const steps = getSteps();
    function getSteps() {
        return ['Authentifiez vous', 'Ajoutez vos informations'];
    }
    const user = useSessionState()

    const signinClickHandler = useCallback(() => {
        setCookie('redirect_url', router.asPath, { path: '/' })
    },[setCookie,router.asPath])

    var  initalValue;
    if (!user) {
        initalValue=0
    }else{
        initalValue=1

    }
    const [activeStep, setActiveStep] = React.useState(initalValue);


    return (
        <AddActorPageLayout>

                    <Typography 
                        color='secondary' 
                        variant='h6'
                        className={styles.userInfosTitle}
                    >
                        Se référencer en tant qu'acteur de la transition
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
            {user && (
                <AddActorForm />
                )}
            {!user && (
                /* @ts-ignore */
                <div>
                    <div className={styles.registerInfo}>
                        <div>
                            <Typography
                                variant="body" component="p"
                            >
                                Vous pouvez créer un compte générique pour l'administation de votre acteur
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                variant="body" component="p"
                            >
                                ou un compte personnel qui permettera d'intéragir en votre nom sur l'outil
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Link  href="/signin"   className={styles.buttonAuthentification}>
                            <ClassicButton onClick={signinClickHandler}>
                                S'authentifier
                            </ClassicButton>
                        </Link>
                    </div>
                </div>
            )}

        </AddActorPageLayout>
    )
}

export default withApollo()(AccountPage)