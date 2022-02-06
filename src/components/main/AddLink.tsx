import { useContext, useState } from "react";
import { LinkContext } from "../../context/LinkContext";
import { Box, Button, Grid, InputLabel, Select, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import useStyles, { CssFormControl, CssTextField } from "./styles";
import axios from "axios";


interface Props {
    addLink: boolean;
    setAddLink: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddLink: React.FC<Props> = ({ addLink, setAddLink }) => {
    const classes = useStyles();
    const [network, setNetwork] = useState<string>(``)
    const [social_link, setSocial_link] = useState<string>(``)
    const [social_id, setSocial_id] = useState<string>(``)
    const { state, dispatch } = useContext(LinkContext);
    const { selectLinkId } = state;


    const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
      if(e.target.value !== ``){
        setNetwork(e.target.value as string)
      }
    }
  
    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSocial_link(e.target.value )
    }
  
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSocial_id(e.target.value )
    }
  
    const handleCancell = (): void => {
      setSocial_link(``)
      setSocial_link(``)
      setSocial_id(``)
      setAddLink(false)
    }

    const handleSubmit = async(e: React.SyntheticEvent) => {
      e.preventDefault();
      await axios.post(`http://localhost:3030/socials`, { network, social_id ,social_link})
      dispatch({type: "ADD_LINK"})
      setSocial_link(``)
      setSocial_link(``)
      setSocial_id(``)
      setAddLink(false)
    }

  return <>
    <Button className={classes.editButton} startIcon={<Add />} onClick={() => setAddLink(true)} style={{marginBottom: `1rem`}}>
        افزودن مسیر ارتباطی
      </Button>
      {addLink && <Box className={classes.addEditBox}>
        <Typography>
          افزودن مسیر ارتباطی
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs>
              <CssFormControl variant="outlined" fullWidth size="small" >
                <InputLabel >نوع*</InputLabel>
                <Select native value={network} onChange={handleSelectChange} >
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
              <CssTextField dir="ltr" size="small" value={social_link} onChange={handleLinkChange} label="لینک" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs>
              <CssTextField dir="ltr" size="small" label="آی دی (ID)" value={social_id} onChange={handleIdChange} variant="outlined" fullWidth/>
            </Grid>
            
          </Grid>


          <Box style={{float: `left`, marginTop: `1.5rem`}} >
            <Button variant="outlined" type="reset" style={{fontSize: `0.7rem`}} onClick={handleCancell} >
              انصراف
            </Button>
            <Button variant="contained" type="submit" className={classes.addButton}>
              ثبت مسیر ارتباطی
            </Button>
          </Box>
        </form>
   
      </Box>}
  </>;
};

export default AddLink;
