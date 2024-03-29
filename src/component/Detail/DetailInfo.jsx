import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ColumTop from "./ColumTop";
import ProjectInfoWrap from "./ProjectInfoWrap";
import DeliveryWrap from "./DeliveryWrap";
import { BsArrowRight } from "react-icons/bs";
import ProductGraph from "./ProductGraph";
import ConfirmWrap from "./ConfirmWrap";
import PointGuide from "./PointGuide";
import MeditationNotice from "./MeditationNotice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  sizeAtom,
  sizeStateAtom,
  productDetailAtom,
  paramAtom,
  tokenAtom,
} from "../../atoms/atom";
import { axiosGetFunction } from "../../module/CustomAxios";

const Container = styled.div`
  .content_top {
    max-width: 1280px;
    overflow: hidden;
    padding: 30px 40px 120px;
    margin: 0 auto;
    .blind {
      overflow: hidden;
      height: 1px;
      width: 1px;
    }
    .column_bind {
      position: relative;
      &:after {
        content: "";
        clear: both;
        display: block;
      }
      .column {
        width: 50%;
        &:first-child {
          float: left;
          padding-right: 3.334%;
          &:before {
            position: absolute;
            content: "";
            width: 1px;
            background-color: rgba(34, 34, 34, 0.1);
            left: 50%;
            bottom: 0;
            top: 0;
          }
        }
        &:nth-child(2) {
          position: relative;
          float: right;
          padding-left: 3.334%;
        }
        .spread {
          height: 560px;
          position: static;
          background-color: transparent;
        }
      }
      .column_fixed {
      }
      .column_right {
        div {
          div {
            .login_alert_layer {
              border: 3px solid blue;
              z-index: 1;
              position: absolute;
              height: 640px;
              width: 560px;
              background-color: hsla(0, 0%, 100%, 0.8);
              display: flex;
              justify-content: center;
              align-items: center;
              .layer_content {
                background-color: #fff;
                width: 318px;
                height: 150px;
                border: 1px solid #d3d3d3;
                text-align: center;
                p {
                  margin: 0;
                  font-size: 14px;
                  padding: 0;
                  padding-top: 27px;
                }
                a {
                  display: inline-block;
                  background-color: #222;
                  color: #fff;
                  font-weight: 700;
                  margin-top: 12px;
                  padding: 12px 18px;
                  border-radius: 12px;
                  text-decoration: none;
                }
              }
            }
          }
        }
      }
    }
  }
  .content_bottom {
    background-color: yellow;
    height: 800px;
  }
`;

const ColumnBox = styled.div`
  position: ${props => props.position};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  .swiper {
    .swiper-wrapper {
      .swiper-slide {
        position: relative;
      }
    }
    .swiper-button-prev {
      &:after {
        font-size: 24px;
        color: rgba(34, 34, 34, 0.3);
      }
    }
    .swiper-button-next {
      position: absolute;
      left: 520px;
      &:after {
        font-size: 24px;
        color: rgba(34, 34, 34, 0.3);
      }
    }
    .swiper-pagination {
      display: flex;
      max-width: 528px;
      margin: 0 16px 20px;
      span {
        height: 2px;
        background-color: #222;
        flex: 1;
        border-radius: 0;
        margin: 0;
      }
    }
  }
  .alert_box {
    width: 560px;
    display: flex;
    align-items: center;
    padding: 12px;
    margin-top: 20px;
    border: 1px solid #ebebeb;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgb(0 0 0 / 12%);
    position: relative;
    .content {
      font-size: 12px;
      .title {
        display: flex;
        span {
          background-color: #ff8824;
          color: #fff;
          line-height: 12px;
          font-weight: 600;
          margin-right: 4px;
          padding: 3px 5px 2px;
          border-radius: 2px;
        }
        p {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
        }
      }
      .detail {
        margin-top: 4px;
        color: rgba(34, 34, 34, 0.5);
      }
      .banner_box {
        margin-top: 20px;
        a {
          background-color: rgb(39, 39, 39);
          display: flex;

          height: 80px;
          justify-content: center;
          img {
          }
        }
      }
    }
    .arrow_icon {
      position: absolute;
      right: 16px;
    }
  }
`;

const BannerBox = styled.div`
  margin-top: 20px;
  a {
    background-color: rgb(39, 39, 39);
    display: flex;
    height: 80px;
    justify-content: center;
    img {
    }
  }
`;

const SwiperImage = styled.div`
  position: relative;
  background-color: rgb(246, 238, 237);
  height: 560px;
  width: 560px;
  background-size: contain;
  overflow: hidden;
  background-image: url("${props => props.img}");
`;

const DetailInfo = () => {
  const productDetail = useRecoilValue(productDetailAtom);
  const [sizeState, setSizeState] = useRecoilState(sizeStateAtom);
  const [size, setSize] = useRecoilState(sizeAtom);
  const param = useRecoilValue(paramAtom);
  const [token, setToken] = useRecoilState(tokenAtom);
  const [ScrollY, setScrollY] = useState(0);
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    console.log("scrollY : ", ScrollY);
  };

  const calcOffset = () => {
    const bind = document.querySelector(".column_bind");
    const box = document.querySelector(".column_box");
    return bind && box ? bind.offsetHeight - box.offsetHeight : 1290;
  };

  useEffect(() => {
    if (sizeState) {
      setSizeState(null);
    }
    axiosGetFunction(
      `/api/kream/product/size/` + param,
      { user_no: 1 },
      token,
      setToken
    ).then(res => {
      setSize(res.data.data.sizes);
    });
  }, []);

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  }, []);

  return (
    <Container>
      <div className="content content_top">
        <h2 className="blind">상품 상세</h2>
        <div className="column_bind">
          <div className="column column_fixed column_left">
            <div className="spread">{/* stay empty */}</div>
            <ColumnBox
              className="column_box"
              position={ScrollY < calcOffset() ? "fixed;" : "absolute;"}
              top={ScrollY < calcOffset() ? "140px;" : "auto;"}
              bottom={ScrollY < calcOffset() ? "auto;" : "0px;"}>
              <Swiper
                pagination={{ clickable: true }}
                navigation={true}
                effect="fade"
                modules={[EffectFade, Pagination, Navigation]}>
                {productDetail && productDetail.product.images.length > 0
                  ? productDetail.product.images.map(item => (
                      <SwiperSlide key={item.name}>
                        <SwiperImage img={item.url}></SwiperImage>
                      </SwiperSlide>
                    ))
                  : null}
              </Swiper>
              <div className="alert_box">
                <div className="content">
                  <div className="title">
                    <span>주의</span>
                    <p>판매 거래 주의사항</p>
                  </div>
                  <div className="detail">반드시 보유한 상품만 판매하세요.</div>
                </div>
                <span className="arrow_icon">
                  <BsArrowRight size={25}></BsArrowRight>
                </span>
              </div>
            </ColumnBox>
          </div>
          <div className="column column_right">
            <div>
              <ColumTop />
              <ProjectInfoWrap />
              <DeliveryWrap />
              <BannerBox>
                <a href="?">
                  <img
                    src="https://ssl.pstatic.net/melona/libs/1432/1432951/13d10eb0c9e6e7bab3d5_20230227190423038.jpg"
                    alt="`banner_image"
                  />
                </a>
              </BannerBox>
              <div>
                <ProductGraph />
                <ConfirmWrap />
                <PointGuide />
                <MeditationNotice />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailInfo;
