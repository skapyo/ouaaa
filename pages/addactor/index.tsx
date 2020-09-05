import AppLayout from "containers/layouts/AppLayout"
import AppContainer from "containers/layouts/AppContainer"
import { Grid,Box, makeStyles, Typography, Avatar,Theme, createStyles } from "@material-ui/core"
import {withApollo} from 'hoc/withApollo'
import AccountLeftMenu from "containers/menus/AccountLeftMenu"

import ClassicButton from "components/buttons/ClassicButton"
import AddActorForm from "containers/forms/AddActorForm"
import AddActorPageLayout from "containers/layouts/addActorPage/AddActorPageLayout"
import gql from "../../containers/forms/UserInfosForm";
import graphqlTag from 'graphql-tag'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import {useQuery} from "@apollo/react-hooks";
import Link from "../../components/Link";
import React from "react";

declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
color?: string;
labelIcon: React.ElementType<SvgIconProps>;
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
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
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

}))
const CREATE_ACTOR = gql`
    mutation createActor($formValues: ActorInfos) {
        createActor(actorInfos: $formValues) {
            id
            name
            email
            role
            phone
            address
            postCode
            city
            lat
            lng
        }
    }`;

const GET_CATEGORIES = graphqlTag`
    { categories
    {   id,
        label
    }
    }
`;
const AccountPage = () => {

    const styles = useStyles()
    const classes = useTreeItemStyles();

    const {data,loading,error} = useQuery(GET_CATEGORIES,{fetchPolicy:"network-only"});


    return (
        <AddActorPageLayout>
            <Grid container spacing={2}>
                <Grid item lg={7}>

                    <Typography 
                        color='secondary' 
                        variant='h6'
                        className={styles.userInfosTitle}
                    >
                        Référencer un acteur de la transition
                    </Typography>

                    <AddActorForm />

                </Grid>
                <Grid item lg={5}>

                    <Grid container justify='center' alignItems='center' direction='column'>
                        <Typography 
                            color='secondary' 
                            variant='h6'
                            className={styles.userInfosTitle}
                        >
                            Photo
                        </Typography>
                        <Avatar className={styles.avatar}/>
                        <ClassicButton>Photo</ClassicButton>
                    </Grid>

                </Grid>
            </Grid>

            <TreeView
                className={classes.root}
                defaultExpanded={['3']}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                {typeof data !== "undefined" && data.categories.map((category, index) => {
                    return (
                        <StyledTreeItem nodeId={category.id} labelText={category.label} labelIcon={"MailIcon"}/>
                    );
                })
                }

                <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={MailIcon} />
                <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon} />
                <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label}>
                    <StyledTreeItem
                        nodeId="5"
                        labelText="Social"
                        labelIcon={SupervisorAccountIcon}
                        labelInfo="90"
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                    />
                    <StyledTreeItem
                        nodeId="6"
                        labelText="Updates"
                        labelIcon={InfoIcon}
                        labelInfo="2,294"
                        color="#e3742f"
                        bgColor="#fcefe3"
                    />
                    <StyledTreeItem
                        nodeId="7"
                        labelText="Forums"
                        labelIcon={ForumIcon}
                        labelInfo="3,566"
                        color="#a250f5"
                        bgColor="#f3e8fd"
                    />
                    <StyledTreeItem
                        nodeId="8"
                        labelText="Promotions"
                        labelIcon={LocalOfferIcon}
                        labelInfo="733"
                        color="#3c8039"
                        bgColor="#e6f4ea"
                    />
                </StyledTreeItem>
                <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} />
            </TreeView>
        </AddActorPageLayout>
    )
}

export default withApollo()(AccountPage)