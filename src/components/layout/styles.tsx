import { makeStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    minHeight: `100vh`,
    color: theme.palette.text.primary,
    boxSizing: `border-box`,
    paddingBottom: theme.spacing(4),
  },
  opener: {
    position: `absolute`,
    top: `50%`,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: `white`,
    color: `#0b0b0b`,
    borderRadius: `50% 0% 50% 50%`,
    boxShadow: `0 0 1px 1px lightgrey`,

    "&:hover": {
      backgroundColor: `white`,
    }
  },
  sideContainer: {
    width: `200px`,
    padding: theme.spacing(3),
  },
  close: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: `-24px`,
    marginRight: `-24px`,
  },
  mode: {
    display: `flex`,
    flexDirection: `column`,
    // alignItems: `center`,
    // justifyContent: `space-between`,
  },
  light: {
    width: `80px`,
    height: `80px`,
    backgroundColor: theme.palette.action.active,
    color: theme.palette.background.paper,
    transition: `0.4s`,

    "&:hover": {
      color: theme.palette.action.active,
      backgroundColor: theme.palette.action.disabledBackground,
    }
  },
  modeContainer: {
    marginTop: theme.spacing(2),
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: theme.spacing(2.5),
  },
  dark: {
    width: `80px`,
    height: `80px`,
    backgroundColor: `#0b0b0b`,
    color: theme.palette.warning.main,
    transition: `0.4s`,
    

    "&:hover": {
      // color: theme.palette.action.active,
      backgroundColor: theme.palette.action.disabledBackground,
    }
  },

}));

export default useStyles;
