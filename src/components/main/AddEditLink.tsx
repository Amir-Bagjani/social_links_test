import { useEffect, useState } from "react";
import { Typography, Grid, Button, Box, FormControl, InputLabel, Select } from "@material-ui/core";

import { Twitter, Delete, Edit, Add, LinkedIn, Language as Website, Instagram, Facebook, Telegram } from "@material-ui/icons";
import useStyles, { CssFormControl, CssTextField } from "./styles";
import AddLink from "./AddLink";


interface Props {
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEditLink: React.FC<Props> = ({ openEdit, setOpenEdit  }) => {
  const classes = useStyles();
  const [addLink, setAddLink] = useState<boolean>(false)

  return (
    <Grid item className={classes.addContainer}>
     {!openEdit && <AddLink addLink={addLink} setAddLink={setAddLink} />}

     {openEdit && <Button className={classes.editButton} startIcon={<Edit />}  style={{marginBottom: `1rem`}}>
        ویرایش مسیر ارتباطی
      </Button>}

       {openEdit  && <Box className={classes.addEditBox}>
        <Typography>
          ویرایش مسیر ارتباطی
        </Typography>


        <Grid container spacing={3}>
          <Grid item xs>
            <CssFormControl variant="outlined" fullWidth size="small" >
              <InputLabel >نوع*</InputLabel>
              <Select native >
                <option aria-label="None" value="" />
                <option value="Instagram">اینیستاگرام</option>
                <option value="Facebook">فیس بوک</option>
                <option value="Telegram">تلگرام</option>
                <option value="Twitter">توییتر</option>
                <option value="LinkedIn">لینکداین</option>
                <option value="Website">وب سایت</option>
              </Select>
            </CssFormControl>
          </Grid>
              
          <Grid item xs>
             <CssTextField size="small" label="لینک" variant="outlined" fullWidth/>
           </Grid>
          <Grid item xs>
             <CssTextField size="small" label="آی دی (ID)" variant="outlined" fullWidth/>
          </Grid>
          
        </Grid>


        <Box style={{alignSelf: `flex-end`}} >
          <Button variant="outlined" style={{fontSize: `0.7rem`}} onClick={() => setOpenEdit(false)} >
            انصراف
          </Button>
          <Button variant="contained" className={classes.addButton}>
            ویرایش مسیر ارتباطی
          </Button>
        </Box>
   
      </Box>}  





    </Grid>
  );
};
export default AddEditLink;
