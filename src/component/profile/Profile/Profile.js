import React from 'react'
import styled from 'styled-components'
import { Hr } from '../../../common/js/style'
import Info from './LoginInfo'
import ProfileInfo from './ProfileInfo'

const Title = styled.div`
  padding: 5px 0 16px;
  border-bottom: 3px solid #333;
  h2{
    font-size: 24px;
  }
`

const Profile = () => {
  return (
    <>
      <Title>
        <h2>프로필 정보</h2>
      </Title>
      <ProfileInfo />
      <Hr margin="0px"/>
      <Info />
      
    </>
  )
}

export default Profile