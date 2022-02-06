import { Grid, Avatar, Box, IconButton } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";

const TopBar: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Grid item>
        <IconButton >
          <SearchIcon />
        </IconButton>
      </Grid>
      <Grid item className={classes.avatar}>
        <Box>
          <img
            alt="flag"
            width="25"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/2560px-Flag_of_Iran.svg.png"
          />
        </Box>
        <Avatar
          alt="Avatar"
          src="https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png"
        />
      </Grid>
    </Grid>
  );
};
export default TopBar;
