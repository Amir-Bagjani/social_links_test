import React, { useContext, useState } from "react";
import { LinkContext, Links } from "../../context/LinkContext";
import { ThemeContext } from "../../context/ThemeContext";
//mui
import { Typography, Grid, Button, Box, InputLabel, Select } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import useStyles, { CssFormControl, CssTextField } from "./styles";
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup'

//component
import AddLink from "./AddLink";
import axios from "axios";
//type
interface Props {
  openEdit: boolean
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEditLink: React.FC<Props> = ({ openEdit, setOpenEdit  }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(LinkContext);
  const { themeMode } = useContext(ThemeContext)
  const { links, selectLinkId } = state;
  const [addLink, setAddLink] = useState<boolean>(false)

  //form validation
const validationSchema = Yup.object({
  network: Yup.string().required(`یک شبکه را انتخاب کنید`),
  social_id: Yup.string().required(`آی دی را وارد کنید`),
  social_link: Yup.string().required(`لینک را وارد کنید`),
})
//type initial state
type InitialValuesType = Yup.InferType<typeof validationSchema>

const initialValues: InitialValuesType = {
  network: findSocialId(selectLinkId)?.network,
  social_id: findSocialId(selectLinkId)?.social_id,
  social_link: findSocialId(selectLinkId)?.social_link,
}
 
  //find link with id
  function findSocialId(id: number | string ): Links {
    return links.filter((i) => i.id === id)[0]
  };
  const transfer = (network: string): string => {
    if(network === "Instagram") return "اینستاگرام"
    if(network === "Facebook") return "فیسبوک"
    if(network === "Telegram") return "تلگرام"
    if(network === "Twitter") return "توییتر"
    if(network === "LinkedIn") return "لینکداین"
    return "وبسایت"
  }
  const handleCancell = (): void => {
    setOpenEdit(false)
    dispatch({type: "SELECT_ID", payload: 0})
  }

  return (
    <Grid item className={classes.addContainer}>
     {!openEdit && <AddLink addLink={addLink} setAddLink={setAddLink} />}

     {openEdit && <Button className={classes.editButton} startIcon={<Edit />}  style={{marginBottom: `1rem`}}>
        ویرایش مسیر ارتباطی
      </Button>}

       {openEdit  && <Box className={classes.addEditBox}>
        <Typography>
         ویرایش مسیر ارتباطی  {transfer(findSocialId(selectLinkId)?.network)}
        </Typography>

        <Formik 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit= {async(values: InitialValuesType,  {resetForm} ) => {
            await axios.put(`http://localhost:3030/socials/${selectLinkId}`, values)
            resetForm()
            dispatch({type: "EDIT_LINK", payload: {id:selectLinkId, ...values}})
            setOpenEdit(false)
            dispatch({type: "SELECT_ID", payload: 0})
          }}
        >
          {({handleSubmit, values, handleChange}) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <CssFormControl variant="outlined" fullWidth size="small" >
                    <InputLabel >نوع*</InputLabel>
                    <Select native name="network" value={values.network} onChange={handleChange}>
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
                  <CssTextField value={values.social_link} name="social_link" onChange={handleChange} dir="ltr" size="small" label="لینک" variant="outlined" fullWidth />
                  <Typography style={{fontSize: `0.8rem`, color: themeMode===`light` ? `yellow` : `red`, marginTop: `0.5rem`}}><ErrorMessage  name="social_link"/></Typography>
                </Grid>
                <Grid item xs>
                  <CssTextField value={values.social_id} name="social_id" onChange={handleChange} dir="ltr" size="small" label="آی دی (ID)" variant="outlined" fullWidth/>
                  <Typography style={{fontSize: `0.8rem`, color: themeMode===`light` ? `yellow` : `red`, marginTop: `0.5rem`}}><ErrorMessage name="social_id" /></Typography>
                </Grid>
                
              </Grid>


              <Box style={{float: `left`, marginTop: `1.5rem`}} >
                <Button variant="outlined" type="reset" style={{fontSize: `0.7rem`}} onClick={handleCancell} >
                  انصراف
                </Button>
                <Button type="submit" variant="contained" className={classes.addButton}>
                  ویرایش مسیر ارتباطی  {transfer(findSocialId(selectLinkId)?.network)}
                </Button>
              </Box>
            </form>
          )}
        </Formik>

      </Box>}  

    </Grid>
  );
};
export default AddEditLink;
