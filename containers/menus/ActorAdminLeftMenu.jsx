import {List, ListItem, makeStyles, Typography} from "@material-ui/core";
import Link from "components/Link";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    "&.Mui-selected": {
      backgroundColor: "white",
      color: theme.palette.secondary.main,
      "& p": {
        fontWeight: "600",
      },
    },
    "&.Mui-selected:hover": {
      backgroundColor: "white",
    },
    "&:hover": {
      backgroundColor: "white",
    },
  },
}));

const ActorAdminLeftMenuListItem = ({ pathname, label }) => {
  const router = useRouter();

  const styles = useStyles();

  return (
    <ListItem
      button
      component={Link}
      href={pathname}
      selected={router.asPath == pathname ? true : false}
      className={styles.root}
    >
      <Typography variant="body1">{label}</Typography>
    </ListItem>
  );
};

const ActorAdminLeftMenu = () => {
  return (
    <List>
      <ActorAdminLeftMenuListItem
          pathname="/actorAdmin"
          label="Administrer mes pages acteurs"
      />
      <ActorAdminLeftMenuListItem
        pathname="/actorAdmin/event"
        label="Administrer mes événements"
      />
    </List>
  );
};

export default ActorAdminLeftMenu;