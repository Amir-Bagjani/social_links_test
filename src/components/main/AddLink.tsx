import { Box, Button, Grid, InputLabel, Select, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import useStyles, { CssFormControl, CssTextField } from "./styles";


interface Props {
    addLink: boolean;
    setAddLink: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLink: React.FC<Props> = ({ addLink, setAddLink }) => {
    const classes = useStyles();




  return <>
    <Button className={classes.editButton} startIcon={<Add />} onClick={() => setAddLink(true)} style={{marginBottom: `1rem`}}>
        افزودن مسیر ارتباطی
      </Button>
      {addLink && <Box className={classes.addEditBox}>
        <Typography>
          افزودن مسیر ارتباطی
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
          <Button variant="outlined" style={{fontSize: `0.7rem`}} onClick={() => setAddLink(false)} >
            انصراف
          </Button>
          <Button variant="contained" className={classes.addButton}>
            ثبت مسیر ارتباطی
          </Button>
        </Box>
   
      </Box>}
  </>;
};

export default AddLink;
