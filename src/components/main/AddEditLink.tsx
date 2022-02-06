import React, { useContext, useEffect, useState } from "react";
import { LinkContext, Links } from "../../context/LinkContext";
//mui
import { Typography, Grid, Button, Box, InputLabel, Select } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import useStyles, { CssFormControl, CssTextField } from "./styles";
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
  const { links, selectLinkId } = state;
  const [addLink, setAddLink] = useState<boolean>(false)
  const [network, setNetwork] = useState<string>(``)
  const [social_link, setSocial_link] = useState<string>(``)
  const [social_id, setSocial_id] = useState<string>(``)

  const findSocialId = (id: number | string ): Links => {
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
    setOpenEdit(false)
    dispatch({type: "SELECT_ID", payload: 0})
  }

  const handleSubmit = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3030/socials/${selectLinkId}`, { network, social_id ,social_link})
    dispatch({type: "EDIT_LINK", payload: {id:selectLinkId, network, social_id ,social_link}})
    setOpenEdit(false)
    dispatch({type: "SELECT_ID", payload: 0})
  }

  useEffect(() => {
    let selectItem = findSocialId(selectLinkId)
    setNetwork(selectItem?.network)
    setSocial_link(selectItem?.social_link)
    setSocial_id(selectItem?.social_id)
    
  }, [selectLinkId])

  return (
    <Grid item className={classes.addContainer}>
     {!openEdit && <AddLink addLink={addLink} setAddLink={setAddLink} />}

     {openEdit && <Button className={classes.editButton} startIcon={<Edit />}  style={{marginBottom: `1rem`}}>
        ویرایش مسیر ارتباطی
      </Button>}

       {openEdit  && <Box className={classes.addEditBox}>
        <Typography>
         ویرایش مسیر ارتباطی  {transfer(findSocialId(selectLinkId).network)}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs>
              <CssFormControl variant="outlined" fullWidth size="small" >
                <InputLabel >نوع*</InputLabel>
                <Select native
                 value={network} onChange={handleSelectChange}
                  >
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
              <CssTextField dir="ltr" size="small" label="لینک"
               value={social_link} 
               onChange={handleLinkChange}
               variant="outlined" fullWidth
              />
            </Grid>
            <Grid item xs>
              <CssTextField dir="ltr" size="small" label="آی دی (ID)"
               value={social_id} 
               onChange={handleIdChange}
               variant="outlined" fullWidth
                />
            </Grid>
            
          </Grid>


          <Box style={{float: `left`, marginTop: `1.5rem`}} >
            <Button variant="outlined" type="reset" style={{fontSize: `0.7rem`}} onClick={handleCancell} >
              انصراف
            </Button>
            <Button type="submit" variant="contained" className={classes.addButton}>
              ویرایش مسیر ارتباطی  {transfer(findSocialId(selectLinkId).network)}
            </Button>
          </Box>
        </form>
   
      </Box>}  





    </Grid>
  );
};
export default AddEditLink;
