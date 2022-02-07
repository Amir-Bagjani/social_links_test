import { Typography, Grid } from "@material-ui/core";
import { useState } from "react";
import AddEditLink from "./AddEditLink";
import ExistLinks from "./ExistLinks";
import useStyles from "./styles";


const Main: React.FC = () => {
  const [openEdit, setOpenEdit] = useState(false)

  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item>
        <Typography component="h6" className={classes.typo}>
          مسیر های ارتباطی
        </Typography>
      </Grid>


      <AddEditLink openEdit={openEdit}  setOpenEdit={setOpenEdit} />

      <ExistLinks setOpenEdit={setOpenEdit}/>

      
    </Grid>
  );
};

export default Main;
