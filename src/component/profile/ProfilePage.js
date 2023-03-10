import React from "react";
import { Inner } from "../../common/js/style";
import { Stack } from "@mui/material";
import ProfileList from "./ProfileList";
import { Box } from "@mui/material";

const ProfilePage = () => {
  return (
    <Inner padding="40px 40px;">
      <Stack direction="row" border="1px solid gray">
        <ProfileList />
        <Box sx={{ width: "1000px", bgcolor: "blue" }}>
          마이페이지~~~~~~~~~~~~~~
        </Box>
      </Stack>
    </Inner>
  );
};

export default ProfilePage;
