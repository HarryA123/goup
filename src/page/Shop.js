import React, {useEffect} from 'react'
import ItemAll from '../component/Shop/ItemAll';
import {useRecoilState} from "recoil";
import {tokenAtom, productAtom} from "../atoms/atom";
import {axiosGetFunction} from "../module/CustomAxios";


const Shop = () => {
    const [token, setToken] = useRecoilState(tokenAtom);
    const [product, setProduct] = useRecoilState(productAtom)

    useEffect(() => {
        axiosGetFunction('/api/kream/product/shop', {
            // brands: '1,2', // 브랜드
            // genders: '', // 성별
            // categories: '', // 카테고리
            // keyword: '', // 검색어
            // size_list: '', // 사이즈
            // price: '', // 금액
            cursor: 2

        }, token, setToken).then((res) => {
            setProduct(res.data.data.products);
        })
    }, [])
    return (
        <>
            <ItemAll/>

        </>
    )
}

export default Shop
