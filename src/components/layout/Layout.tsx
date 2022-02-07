import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

//components
import Content from "../content/Content";
import TopBar from "../topbar/TopBar";

//style
import useStyles from "./styles";
import { Box, Button, Divider, Drawer, IconButton, Typography } from "@material-ui/core";
import { Brightness4, Close, Flare, MenuOpen } from "@material-ui/icons";


const Layout: React.FC = () => {
  const classes = useStyles();
  const [openSidebar, setOpenSideBar] = useState<boolean>(false)
  const { setThemeMode } = useContext(ThemeContext)

  return (
    <Box className={classes.container}>
      {/* sidebar menu */}
      <Button className={classes.opener} onClick={() => setOpenSideBar(openSidebar => !openSidebar)}><MenuOpen /></Button>
      <Drawer anchor="right" open={openSidebar} onClose={() => setOpenSideBar(false)}>
        <Box className={classes.sideContainer}>
          <Box className={classes.close}>
            <Typography>Settings</Typography>
            <IconButton onClick={() => setOpenSideBar(false)}>
              <Close  />
            </IconButton>
          </Box>
          <Divider className={classes.dividerClass}/>
          <Box className={classes.mode}>
            <Typography>Mode</Typography>
            <Box className={classes.modeContainer}>
              <Button className={classes.dark} onClick={() => setThemeMode(`light`)}>
              <Brightness4 />
                </Button>
              <Button className={classes.light} onClick={() => setThemeMode(`dark`)}>
                <Flare />
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <TopBar />
      <Content />
    </Box>
  );
};

export default Layout;
