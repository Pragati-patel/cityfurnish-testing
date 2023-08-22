import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import {useDispatch, useSelector} from "react-redux";
import {productImageBaseUrl} from "@/constants/constant";
import InfiniteScroll from "react-infinite-scroll-component";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import {
  addSetProduct,
  addSubCategoryMetaSubProduct,
} from "@/store/Slices/categorySlice";
import SoldOutProduct from "../SoldOutProduct/SoldOutProduct";

const ProductSet = () => {
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const homePageReduxData = useSelector(state => state.homePagedata);

  const singleItemLength =
    categoryPageReduxData?.categoryMetaData?.totalProduct;
  const comboItemLength =
    categoryPageReduxData?.categoryMetaSubProduct?.totalProduct;

  const bodyData = {
    subCategoryId: homePageReduxData?.productName?.id,
    parentCategoryId: homePageReduxData?.productName?.rootID,
    cityId: 50,
    pageNo,
  };
  const bodyDataAll = {
    parentCategoryId: categoryPageReduxData?.parentCategoryId,
    cityId: 50,
    pageNo,
  };

  const payload = categoryPageReduxData?.isAllProduct ? bodyDataAll : bodyData;

  const {mutateAsync: getComboProducts} = useMutation(
    "category-combo-product",
    "POST",
    endPoints.categoryComboProduct,
    payload,
  );

  if (categoryPageReduxData?.singleProduct?.length === singleItemLength) {
    useEffect(() => {
      getComboProducts()
        .then(res => {
          setTotalPage(res?.data?.meta?.totalPage);
          dispatch(addSubCategoryMetaSubProduct(res?.data?.meta));
          dispatch(
            addSetProduct([
              ...categoryPageReduxData?.setProduct,
              ...res?.data?.products,
            ]),
          );
        })
        .catch(err => console.log(err));
    }, [pageNo]);
  }
  // useEffect(() => {
  //   getComboProducts()
  //     .then(res => {
  //       setTotalPage(res?.data?.meta?.totalPage);
  //       dispatch(addSubCategoryMetaSubProduct(res?.data?.meta));
  //       dispatch(
  //         addSetProduct([
  //           ...categoryPageReduxData?.setProduct,
  //           ...res?.data?.products,
  //         ]),
  //       );
  //     })
  //     .catch(err => console.log(err));
  // }, [pageNo]);

  const data = categoryPageReduxData?.setProduct;

  return data.length ? (
    <>
      <div className={style.main_wrapper}>
        <h2 className={style.heading}>Product sets</h2>
        <div>
          <InfiniteScroll
            dataLength={data.length}
            next={() => {
              if (pageNo <= totalPage) {
                setPageNo(prev => prev + 1);
              }
            }}
            hasMore={true} // Replace with a condition based on your data source}
            className="!w-full !h-full">
            <div className={style.main_container}>
              {data?.map((item, index) => {
                return item?.subProduct.length ? (
                  <div className={style.card_box}>
                    <Card
                      cardImage={`${productImageBaseUrl}${
                        item?.image?.split(",")[0]
                      }`}
                      productImageBaseUrl
                      desc={item?.product_name}
                      originalPrice={item?.price}
                      currentPrice={item?.sale_price}
                      // hoverCardImage={`${productImageBaseUrl}${
                      //   item?.image?.split(",")[1]
                      // }`}
                      hoverCardImage={
                        item?.image?.split(",").filter(item => item).length > 1
                          ? productImageBaseUrl + item?.image?.split(",")[1]
                          : productImageBaseUrl + item?.image?.split(",")[0]
                      }
                      discount={`${Math.round(
                        ((item?.price - item?.sale_price) * 100) / 1000,
                      ).toFixed(2)}%`}
                      productId={item?.product_id}
                      productName={item?.product_name.replace(/ /g, "-")}
                    />
                  </div>
                ) : null;
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      {categoryPageReduxData?.setProduct?.length === comboItemLength ? (
        <SoldOutProduct />
      ) : null}
    </>
  ) : null;
};

export default ProductSet;