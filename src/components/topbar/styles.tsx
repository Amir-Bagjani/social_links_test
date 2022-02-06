import { makeStyles, Theme, alpha } from "@material-ui/core/styles";



const useStyles = makeStyles((theme: Theme) => ({
  container: {
    alignItems: `center`,
    justifyContent: `space-between`,
    padding: theme.spacing(4),
  },
  avatar: {
    display: `flex`,
    alignItems: `center`,
    gap: theme.spacing(1.5),
    cursor: `pointer`
  },
  searchIcon: {
    color: `#fff`
  },
 
}));



export default useStyles;
