import { useContext, useState } from "react";
import { LinkContext } from "../../context/LinkContext";
//mui
import { Box, Button, Modal, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import { CssTextField } from "./styles";

//axios
import Axios from "axios";

//type
interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

//style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: `absolute`,
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),
      width: `35%`,
      boxShadow: `-5px 5px 10px 10px ${alpha(theme.palette.common.black, 0.2)}`,
    },
    typo: {
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(4),
    },
    typoDetail: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2),
      fontSize: `0.7rem`,
    },
    buttons: {
      display: `flex`,
      gap: theme.spacing(2),
      justifyContent: `flex-end`,
      marginTop: theme.spacing(6),
    },
    cancel: {
      color: theme.palette.warning.light,
      fontSize: `0.7rem`,
      marginLeft: theme.spacing(2),

      "&:hover": {
        backgroundColor: alpha(theme.palette.warning.light, 0.2),
      },
    },
    delete: {
      color: theme.palette.error.main,
      padding: theme.spacing(0.5),
      fontSize: `0.7rem`,

      "&:hover": {
        backgroundColor: alpha(theme.palette.error.main, 0.2),
      },
    },
  })
);

const ModalDelete: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(LinkContext);
  const [confirm, setConfirm] = useState<string>(``);
  const { selectLinkId, links } = state;

  const findSocialId = (id: string | number ): string => {
    return links.filter((i) => i.id === id)[0]?.social_id;
  };

  const handleCancel = (): void => {
    setConfirm(``);
    setOpenModal(false);
  };

  const handleDelete = async () => {
    if (confirm === `تایید`) {
      try {
        await Axios.delete(`http://localhost:3030/socials/${selectLinkId}`);
        dispatch({ type: "DELETE_LINK", payload: selectLinkId });
        dispatch({ type: "SELECT_ID", payload: 0 });
      } catch (err) {
        console.log(err);
      }
      setConfirm(``);
      setOpenModal(false);
    }
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box className={classes.container}>
        <Typography component="h5" className={classes.typo}>
          آیا از تصمیم خود مطمئن هستید؟
        </Typography>

        <Typography component="h5" className={classes.typoDetail}>
          برای حذف مسیر ارتباطی { findSocialId(selectLinkId)} لطفا کلمه تایید را
          بنویسید
        </Typography>

        <CssTextField
          size="small"
          value={confirm}
          variant="outlined"
          fullWidth
          placeholder="تایید"
          onChange={(e) => setConfirm(e.target.value)}
        />

        <Box className={classes.buttons}>
          <Button className={classes.cancel} onClick={handleCancel}>
            انصراف
          </Button>
          <Button
            disabled={confirm !== `تایید`}
            className={classes.delete}
            onClick={handleDelete}
          >
            حذف
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
