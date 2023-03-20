import React from 'react'
// react tab
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Inner } from '../../common/js/style';
import Home from './Home'
import Gender from './Gender';
import {useRecoilState, useRecoilValue} from "recoil";
import {userAtom} from "../../atoms/atom";

// common style


const Product = () => {
  const [user, setUser] = useRecoilState(userAtom);
  console.log(user);
  return (
    <>
      <Tabs>
        <TabList>
          <Inner padding="0 40px;">
            <Tab>추천</Tab>
            <Tab>남성</Tab>
            <Tab>여성</Tab>
          </Inner>
            
          </TabList>
        <TabPanel>
          <Home></Home>
        </TabPanel>
        <TabPanel>
          <Gender></Gender>
        </TabPanel>
        <TabPanel>
          <Gender></Gender>
        </TabPanel>
      </Tabs>
    </>
  )
}

export default Product