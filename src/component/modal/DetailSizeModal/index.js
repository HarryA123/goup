import React from "react";
import styled from "@emotion/styled";
import { Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { TfiClose } from "react-icons/tfi";
import { RiArrowDropDownFill } from "react-icons/ri";
import SizeButton from "./SizeButton";

const DetailSizeModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const button = {
    padding: 0,
    color: "inherit",
    fontSize: "16px",
  };
  const subtext = {
    fontSize: "16px",
    fontWeight: 700,
    textAlign: "center",
  };

  const header = {
    borderTopRadius: "16px",
  };

  const text = {
    height: "60px",
    fontSize: "18px",
    fontWeight: 700,
    padding: "20px 50px",
    textAlign: "center",
  };

  const style = {
    borderRadius: "16px",
    bgcolor: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 480,
    boxShadow: 24,
  };

  return (
    <div>
      <Button sx={button} className="button" onClick={handleClickOpen}>
        <Typography sx={subtext}>모든 사이즈</Typography>
        <RiArrowDropDownFill size={24}></RiArrowDropDownFill>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box className="close_button">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}>
              <TfiClose size={24}></TfiClose>
            </IconButton>
          </Box>
          <Box sx={header} className="header">
            <Typography sx={text}>사이즈</Typography>
          </Box>
          <Box sx={{ margin: "10px 0 32px",height:"412px", overflowX:"hidden" }}>
            <Box sx={{ minHeight: "488px", padding: "0 32px" }}>
              <Grid container className="content" sx={{}}>
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                ].map((item, id) => (
                  <Grid item xs={3.75} sx={{ margin: "4px" }}>
                    <SizeButton onClick={handleClose} key={id} size={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailSizeModal;