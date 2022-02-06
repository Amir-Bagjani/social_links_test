import { Box, Typography, Link, Breadcrumbs } from "@material-ui/core";
import Main from "../main/Main";
import useStyles from "./styles";

const Content: React.FC = () => {
  const classes = useStyles();

  return <Box className={classes.container}>
    <Typography gutterBottom variant="h6" component="h1">حساب کاربری</Typography>
    <Breadcrumbs aria-label="breadcrumb" separator=".">
      <Link color="textPrimary"  >
        خانه
      </Link>
      <Link color="textPrimary" >
        کاربر
      </Link>
      <Typography  color="inherit">تنظیمات کاربری</Typography>
    </Breadcrumbs>

    <Main />

  </Box>;
};

export default Content;
