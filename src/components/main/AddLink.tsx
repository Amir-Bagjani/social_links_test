import { useContext } from "react";
import { LinkContext } from "../../context/LinkContext";
import { ThemeContext } from "../../context/ThemeContext";
import axios from "axios";
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
//MUI
import { Box, Button, Grid, InputLabel, Select, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import useStyles, { CssFormControl, CssTextField } from "./styles";

//type props
interface Props {
  addLink: boolean;
  setAddLink: React.Dispatch<React.SetStateAction<boolean>>;
}


const AddLink: React.FC<Props> = ({ addLink, setAddLink }) => {
    const classes = useStyles();
    const { dispatch, state } = useContext(LinkContext);
    const { themeMode } = useContext(ThemeContext);
    //form validation
    const validationSchema = Yup.object({
      network: Yup.string().required(`یک شبکه را انتخاب کنید`).notOneOf([...state.links.map(i => i.network)], `این شبکه قبلا انتخاب شده است`),
      social_id: Yup.string().required(`آی دی را وارد کنید`),
      social_link: Yup.string().required(`لینک را وارد کنید`),
    })
    //type initial state
    type InitialValuesType = Yup.InferType<typeof validationSchema>

    const initialValues: InitialValuesType = {
      network: ``,
      social_id: `` ,
      social_link: ``
    }
  
  return <>
      <Button className={classes.editButton} startIcon={<Add />} onClick={() => setAddLink(true)} style={{marginBottom: `1rem`}}>
        افزودن مسیر ارتباطی
      </Button>

      {addLink && <Box className={classes.addEditBox}>
        <Typography>
          افزودن مسیر ارتباطی
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit= {async(values: InitialValuesType,  {resetForm} ) => {
            await axios.post(`http://localhost:3030/socials`, values)
            resetForm()
            dispatch({type: "ADD_LINK"})
            setAddLink(false)
          }}
        >
          {({handleSubmit, values, handleChange}) => (
              <form onSubmit={handleSubmit} >
              <Grid container spacing={3}>
                <Grid item xs>
                  <CssFormControl variant="outlined" fullWidth size="small" >
                    <InputLabel >نوع*</InputLabel>
                    <Select native name="network" value={values.network} onChange={handleChange} >
                      <option aria-label="None" value="" />
                      <option value="Instagram">اینیستاگرام</option>
                      <option value="Facebook">فیس بوک</option>
                      <option value="Telegram">تلگرام</option>
                      <option value="Twitter">توییتر</option>
                      <option value="LinkedIn">لینکداین</option>
                      <option value="Website">وب سایت</option>
                    </Select>
                  </CssFormControl>
                  <Typography style={{fontSize: `0.8rem`, color: themeMode===`light` ? `yellow` : `red`, marginTop: `0.5rem`}}><ErrorMessage name="network"/></Typography>
                </Grid>
                
                <Grid item xs>
                  <CssTextField dir="ltr" size="small" value={values.social_link} name="social_link" onChange={handleChange} label="لینک" variant="outlined" fullWidth/>
                  <Typography style={{fontSize: `0.8rem`, color: themeMode===`light` ? `yellow` : `red`, marginTop: `0.5rem`}}><ErrorMessage  name="social_link"/></Typography>
                </Grid>
                <Grid item xs>
                  <CssTextField dir="ltr" size="small" label="آی دی (ID)" value={values.social_id} name="social_id" onChange={handleChange} variant="outlined" fullWidth/>
                  <Typography style={{fontSize: `0.8rem`, color: themeMode===`light` ? `yellow` : `red`, marginTop: `0.5rem`}}><ErrorMessage name="social_id" /></Typography>
                </Grid>
                
              </Grid>
  
              <Box style={{float: `left`, marginTop: `1.5rem`}} >
                <Button variant="outlined" type="reset" style={{fontSize: `0.7rem`}} onClick={() => setAddLink(false)} >
                  انصراف
                </Button>
                <Button variant="contained" type="submit" className={classes.addButton}>
                  ثبت مسیر ارتباطی
                </Button>
              </Box>
            </form>
          )}
        </Formik>
   
      </Box>}
  </>;
};

export default AddLink;
