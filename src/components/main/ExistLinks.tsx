import { useContext, useState } from "react";
import { LinkContext } from "../../context/LinkContext";
//material ui
import { Typography, Grid, Button, Modal } from "@material-ui/core";
import { Twitter, Delete, Edit } from "@material-ui/icons";
//components
import useStyles from "./styles";
import ModalDelete from "./ModalDelete";


interface Prop {
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExistLinks: React.FC<Prop> = ( { setOpenEdit }) => {

  const classes = useStyles();
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { state, dispatch } = useContext(LinkContext)
  const { links : data } = state;

  const handleDelete = (id: number | string): void => {
    setOpenModal(true)
    dispatch({type: "SELECT_ID", payload: id})
  }

  const handleEdit = (id: number | string): void => {
    setOpenEdit(true)
    dispatch({type: "SELECT_ID", payload: id})
  }

  const transfer = (network: string): string => {
    if(network === "Instagram") return "اینستاگرام"
    if(network === "Facebook") return "فیسبوک"
    if(network === "Telegram") return "تلگرام"
    if(network === "Twitter") return "توییتر"
    if(network === "LinkedIn") return "لینکداین"
    return "وبسایت"
  }

       

  return (<>
    <Grid item className={classes.existLinks}>
      {data.length > 0 &&
        data.map((item) => (
          <Grid className={classes.itemLinks} key={item.id}>
            <Twitter />
            <Typography component="h6" className={classes.typoSpan}>
              {transfer(item.network)}
            </Typography>
            <Typography component="h6" className={classes.typoSpan}>
              <span className={classes.span}>آی دی (ID): </span>
              {item.social_id}
            </Typography>
            <Typography component="h6" className={classes.typoSpanL}>
              <span className={classes.span}>لینک : </span>
              {item.social_link}
            </Typography>

            <Button className={classes.editButton} startIcon={<Edit />} onClick={()=>handleEdit(item.id)}>
              ویرایش
            </Button>
            <Button className={classes.deleteButton} startIcon={<Delete />} onClick={() => handleDelete(item.id)}>
              حذف
            </Button>
          </Grid>
        ))}
    </Grid>

    <ModalDelete openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
export default ExistLinks;
