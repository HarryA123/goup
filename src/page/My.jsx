import React, { useEffect } from "react";
import { Inner } from "../common/js/style";
import ProfileList from "../component/profile/ProfileList";
import Buying from "../component/profile/Buying/Buying";
import Selling from "../component/profile/Selling/Selling";
import Wish from "../component/profile/Wish/Wish";
import Profile from "../component/profile/Profile/Profile";
import Address from "../component/profile/Address/Address";
import Account from "../component/profile/Account/Account";
import Receipt from "../component/profile/Receipt/Receipt";
import Point from "../component/profile/Point/Point";
import { Box, Stack } from "@mui/material";
import SellingContent from "../component/profile/SellingContent";
import ProfileCard from "../component/profile/ProfileCard";
import BuyingContent from "../component/profile/BuyingContent";
import WishContent from "../component/profile/WishContent";
import Layout from "../component/Layout";

const My = ({ path }) => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <Layout>
      <Inner padding="40px 40px;">
        <Stack direction="row">
          <ProfileList path={path} />
          <Box sx={{ width: "100%" }}>
            {path === "buying" && <Buying />}
            {path === "selling" && <Selling />}
            {path === "wish" && <Wish />}
            {path === "profile" && <Profile />}
            {path === "address" && <Address />}
            {path === "account" && <Account />}
            {path === "receipt" && <Receipt />}
            {path === "point" && <Point />}
            {path === undefined && (
              <>
                <ProfileCard />
                <BuyingContent />
                <SellingContent />
                <WishContent />
              </>
            )}
          </Box>
        </Stack>
      </Inner>
    </Layout>
  );
};

export default My;
