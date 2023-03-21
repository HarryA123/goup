import React, {useEffect} from "react";
// styled-component
import styled from "styled-components";
// Common style
import {Inner} from "../common/js/style";
// logo 경로
import logo from "../common/images/logo.png";
// react icon
import {Link} from "react-router-dom";
// tab custom css
import "../common/css/custom.css";
import SearchModal from "./modal/SearchModal";
import {useRecoilState} from "recoil";
import {userAtom} from "../atoms/atom";

const HeaderBlock = styled.header`
  position: sticky;
  top: 0;
  background-color: #fff;
`;
const Top = styled.div`
  display: flex;
  justify-content: end;
  padding: 8px 0;
  box-sizing: border-box;

  ul {
    display: flex;
    list-style: none;
    margin: 0;

    li {
      padding: 0 12px;
      box-sizing: border-box;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      a {
        color: #222;
        text-decoration: none;
        font-size: 12px;
      }
    }
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  box-sizing: border-box;

  ul {
    display: flex;
    list-style: none;
    margin: 0;

    li {
      padding: 0 20px;
      box-sizing: border-box;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 40px;
      }

      a {
        color: #222;
        text-decoration: none;
        font-size: 18px;
      }
    }
  }
`;

const NavBlock = styled.div`
  display: flex;
  align-items: center;

  .flex {
    display: flex;
    cursor: pointer;
  }
`;

const Header = () => {
    const [getUser, setUser] = useRecoilState(userAtom);

    return (
        <HeaderBlock>
            <Inner padding="0 40px;">
                <Top>
                    <ul>
                        <li>
                            <Link to="/">고객센터</Link>
                        </li>
                        <li>
                            <Link to="/my/wish">관심상품</Link>
                        </li>
                        <li>
                            <Link to="/login">{
                                getUser ? '로그아웃' : '로그인'
                            }</Link>
                        </li>
                    </ul>
                </Top>
                <Navbar>
                    <div>
                        <a href="/">
                            <img width="120px" src={logo}></img>
                        </a>
                    </div>
                    <NavBlock>
                        <nav>
                            <ul>
                                <li>
                                    <a href="/">HOME</a>
                                </li>
                                <li>
                                    <Link to="/style">STYLE</Link>
                                </li>
                                <li>
                                    <Link to="/shop">SHOP</Link>
                                </li>
                                <li>
                                    <Link to="/login">MY</Link>
                                </li>
                            </ul>
                        </nav>
                        <SearchModal/>
                    </NavBlock>
                </Navbar>
            </Inner>
        </HeaderBlock>
    );
};

export default Header;
