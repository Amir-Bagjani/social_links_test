import { Box } from "@material-ui/core";

//components
import Content from "../content/Content";
import TopBar from "../topbar/TopBar";

//style
import useStyles from "./styles";


const Layout: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <TopBar />
      <Content />
    </Box>
  );
};

export default Layout;
