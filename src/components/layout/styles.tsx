import { makeStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    minHeight: `100vh`,
    color: theme.palette.text.primary,
    boxSizing: `border-box`,
    paddingBottom: theme.spacing(4),
  },
}));

export default useStyles;
