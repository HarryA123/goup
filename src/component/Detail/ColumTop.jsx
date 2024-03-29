import React from "react";
import styled from "styled-components";
import BuySellButton from "./BuySellButton";
import {useRecoilValue} from "recoil";
import DetailSizeModal from "../modal/DetailSizeModal";
import DetailBookMarkModal from "../modal/DetailBookMarkModal";
import {productDetailAtom, sizeAtom} from "../../atoms/atom";
import {Typography} from "@mui/material";

const DetailMainTitle = styled.div`
  font-size: 18px;

  div {
    margin-bottom: 10px;

    a {
      text-decoration: none;
      border-bottom: 2px solid black;
      font-weight: 800;
      color: black;
    }
  }

  .productName {
    margin-bottom: 4px;
  }

  .ProductKoName {
    font-size: 14px;
    line-height: 17px;
    color: rgba(34, 34, 34, 0.5);
  }
`;

const SizeInfo = styled.div`
  display: flex;
  direction: row;
  justify-content: space-between;
  padding: 19px 0 12px;
  border-bottom: 1px solid rgb(235, 235, 235);

  .title {
    font-size: 13px;
    color: rgba(34, 34, 34, 0.8);
  }

  .detail {
    font-weight: 700;
  }

  .button {
    background-color: #fff;
    border: none;
    font-size: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;

    p {
      margin: 0;
    }
  }
`;

const RecentPrice = styled.div`
  display: flex;
  direction: row;
  justify-content: space-between;
  margin-top: 11px;

  .title {
    font-size: 13px;
    color: rgba(34, 34, 34, 0.8);
  }

  .detail {
    font-weight: 700;
    font-size: 20px;
    text-align: right;
  }

  p {
    font-size: 13px;
    margin: 0px;
    text-align: right;

    &.plus {
      color: rgb(241, 87, 70);
    }

    &.minus {
      color: rgb(65, 185, 121);
    }
  }
`;

const ColumTop = () => {
    const productDetail = useRecoilValue(productDetailAtom);
    const size = useRecoilValue(sizeAtom);

    return (
        <div>
            <DetailMainTitle>
                <div>
                    <a href="3">{productDetail.brand.name}</a>
                </div>
                <div className="productName">{productDetail.product.en_name}</div>
                <div className="ProductKoName">{productDetail.product.kor_name}</div>
            </DetailMainTitle>
            <div className="product_figure_wrap">
                <SizeInfo>
                    <div className="title">사이즈</div>
                    {size && size[0].size === "ONE SIZE" ? (
                        <Typography >ONE SIZE</Typography>
                    ) : (
                        <DetailSizeModal product={productDetail}/>
                    )}
                </SizeInfo>
                <RecentPrice>
                    <div className="title">최근 거래가</div>
                    {productDetail.recent_order_price ? (
                        <div>
                            <div className="detail">
                                {productDetail.recent_order_price.toLocaleString()}원
                            </div>
                            {
                                productDetail && productDetail.recent_2nd_order_price !== null && productDetail.recent_2nd_order_price !== 0 ?
                                    <p className={productDetail.recent_order_price - productDetail.recent_2nd_order_price > 0 ? 'plus' : productDetail.recent_order_price - productDetail.recent_2nd_order_price < 0 ? 'minus' : ''}>
                                        {((productDetail.recent_order_price -
                                            productDetail.recent_2nd_order_price)).toLocaleString()}원
                                        (
                                        {Math.round((((productDetail.recent_order_price -
                                                    productDetail.recent_2nd_order_price) /
                                                productDetail.recent_2nd_order_price) *
                                            100) * 10) / 10}
                                        %)
                                    </p> : null
                            }

                        </div>
                    ) : (
                        <div>
                            <div className="detail">-</div>
                            <p>-</p>
                        </div>
                    )}
                </RecentPrice>
            </div>
            <div className="buttonWrap">
                <BuySellButton/>
                <DetailBookMarkModal/>
            </div>
        </div>
    );
};

export default ColumTop;
