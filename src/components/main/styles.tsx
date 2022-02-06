import { FormControl, Select, TextField } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  alpha,
} from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(3),
      gap: theme.spacing(3),
      backgroundColor: alpha(theme.palette.common.white, 0.1),
      padding: theme.spacing(3),
      borderRadius: theme.spacing(2),
      boxShadow: `-5px 5px 10px 10px ${alpha(theme.palette.common.black, 0.2)}`,
      boxSizing: `border-box`,
    },
    typo: {
      fontSize: `0.7rem`,
      color: theme.palette.text.disabled,
    },
    existLinks: {
      backgroundColor: alpha(theme.palette.common.white, 0.16),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      borderRadius: theme.spacing(1),
    },
    addContainer: {
      display: `flex`,
      flexDirection: "column",
      alignItems: `flex-start`,
    },
    itemLinks: {
      display: `flex`,
      alignItems: `center`,
      gap: theme.spacing(1.5),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    deleteButton: {
      color: theme.palette.error.main,
      padding: theme.spacing(0.5),
      fontSize: `0.7rem`,

      "&:hover": {
        backgroundColor: alpha(theme.palette.error.main, 0.2),
      },
    },
    addButton: {
      backgroundColor: theme.palette.warning.light,
      fontSize: `0.7rem`,
      marginLeft: theme.spacing(2),
      boxShadow: `-2px 2px 5px 5px ${alpha(theme.palette.warning.light, 0.2)}`,

      "&:hover": {
        backgroundColor: alpha(theme.palette.warning.light, 0.7),
      },
    },
    editButton: {
      color: theme.palette.warning.light,
      padding: theme.spacing(0.5),
      fontSize: `0.7rem`,

      "&:hover": {
        backgroundColor: alpha(theme.palette.warning.light, 0.2),
      },
    },
    addEditBox: {
      backgroundColor: alpha(theme.palette.common.white, 0.16),
      borderRadius: theme.spacing(1),
      padding: theme.spacing(2),
      display: `flex`,
      flexDirection: "column",
      width: `calc(100% - 32px)`,
      gap: theme.spacing(3),
    },
    typoSpan: {
      fontSize: `0.7rem`,
    },
    typoSpanL: {
      fontSize: `0.7rem`,
      marginRight: `auto`,
      color: theme.palette.warning.light,
    },
    span: {
      color: theme.palette.text.disabled,
    },
  })
);
export default useStyles;


export const CssTextField = withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.warning.light,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.warning.light,
      },
    },
  },
}))(TextField);

export const CssFormControl = withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.warning.light,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.warning.light,
      },
    },
  },
}))(FormControl);


