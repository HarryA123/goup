import React, {useState} from 'react'
import styled from 'styled-components'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Modal from '@mui/material/Modal';
import {productAtom, modalOpenAtom, modalProductAtom, tokenAtom, sizeAtom} from '../../atoms/atom';
import {useRecoilState} from 'recoil';
import {axiosGetFunction} from "../../module/CustomAxios";

const ItemBlcok = styled.div`
  p {
    margin: 0;
  }

  .product-info {
    padding: 8px 4px 0;
    margin-bottom: 12px;
    height: 85px;

    .name {
      font-size: 13px;
      color: #333;
      font-weight: 700;
      margin-bottom: 2px;
    }

    .item-detail {
      font-size: 13px;
      color: #222;
      margin-bottom: 2px;
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      
    }

    .item-detail-kr {
      font-size: 11px;
      color: rgba(34, 34, 34, .5);
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .price-info {
    padding: 0 4px;

    .price {
      font-size: 14px;
      font-weight: 700;
    }

    .desc {
      font-size: 11px;
      color: rgba(34, 34, 34, .5);
    }
  }

  .icon-box {
    padding: 12px 4px 0 0;
    display: flex;
    justify-content: space-between;

    .save {

    }

    .save {
      cursor: pointer;
    }
  }

`

const ImgBox = styled.div`
  height: 230px;
  background-image: url(${props => props.backgroundImage});
  background-size: contain;
  background-repeat: no-repeat;
`
// modal style



const ShopItem = ({product, idx}) => {
    // modal
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useRecoilState(modalOpenAtom);
    // item book mark
    const toggle = product._wish;
    const [products, setProducts] = useRecoilState(productAtom);
    const [modalProduct, setModalProduct] = useRecoilState(modalProductAtom);
    const [token, setToken] = useRecoilState(tokenAtom);
    const [sizes, setSizes] = useRecoilState(sizeAtom);

    const confirmClcik = () => {
      const sample = {...product};
      sample._wish = !sample._wish;
      const newList = [...products].map((v, i) => {
          if (i === idx) return sample; else return v;
      })
      setProducts(newList);
      console.log(sample._wish)
      handleClose()
    }

    const modalOpen = (no) => {
        axiosGetFunction('/api/kream/product/size/' + no + '?user_no=' + 1, {}, token, setToken).then((res) => {
            console.log(res);
            setSizes(res.data.data.sizes);
            setModalProduct(product);
            setOpen(true);
        });
    }

    function addComma(number) {
        let len;
        let point;
        let str;
        const number_string = number + '';
        point = number_string.length % 3;
        len = number_string.length;
        str = number_string.substring(0, point);
        while (point < len) {
            if (str !== '') str += ',';
            str += number_string.substring(point, point + 3);
            point += 3;
        }
        return str;
    }
    return (
        <>
          <ItemBlcok>
              <ImgBox backgroundImage={product.image.url}></ImgBox>
              <div>
                  <div className='product-info'>
                      <p className='name'>{product.brand.name}</p>
                      <p className='item-detail'>{product.en_name}</p>
                      <p className='item-detail-kr'>{product.kor_name}</p>
                  </div>
                  <div className='price-info'>
                      <p className='price'>{product.price != null ? addComma(product.price) : '-'} 원</p>
                      <p className='desc'>즉시 구매가</p>
                  </div>
                  <div className='icon-box'>
                      <div className='save' onClick={() => {
                          modalOpen(product.no)
                      }}>
                          {
                              !toggle ? <BookmarkBorderIcon/> : <BookmarkIcon/>
                          }
                      </div>
                  </div>
              </div>
          </ItemBlcok>
          {/*<SizeModal */}
          {/*product={product}*/}
          {/*confirmClcik={confirmClcik}*/}
          {/*/>*/}
        </>
    )
}

export default ShopItem