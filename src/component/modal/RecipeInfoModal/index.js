import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Grid, Typography, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import { TfiClose } from "react-icons/tfi";
import { BiCheck } from "react-icons/bi";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAddressAtom } from "../../../atoms/atom";
import { Hr } from "../../../common/js/style";
import TwoButton from "../AddAddressModal/TwoButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const RecipeInfoModal = ({ product }) => {
  const [open, setOpen] = useState(false);
  const userAddress = useRecoilValue(userAddressAtom);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const button = {
    border: "1px solid #d3d3d3",
    borderRadius: "10px",
    color: "rgba(34,34,34,0.8)",
    height: "36px",
    padding: "0",
  };

  const subtext = {
    fontSize: "12px",
    padding: "4px 0",
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
    width: 448,
    boxShadow: 24,
  };

  return (
    <>
      <div>
        <Button sx={button} className="button" onClick={handleOpen}>
          <Typography sx={subtext}>변경</Typography>
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
              <Typography sx={text}>현금영수증 정보</Typography>
            </Box>
            <Box
              sx={{
                margin: "0 20px",
                height: "410px",
              }}>
              <Typography sx={{ fontSize: "13px" }}>
                현금영수증은 판매 거래 시 발생하는 수수료에 대해 '정산완료' 후
                7일 이내에 건별로 발급됩니다. ‘미신청' 선택 시 자진발급으로
                처리됩니다.
              </Typography>
              <Box sx={{ marginY: "10px" }}>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    형태
                  </InputLabel>
                  <NativeSelect
                    defaultValue={10}
                    inputProps={{
                      name: "형태",
                      id: "uncontrolled-native",
                    }}>
                    <option value={10}>미신청</option>
                    <option value={20}>개인소득공제(휴대폰)</option>
                    <option value={30}>개인소득공제(현금영수증카드)</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <TwoButton
                handleClose={handleClose}
                solid="저장하기"
                padding="230px 0 0"
                disabled={false}
              />
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default RecipeInfoModal;
