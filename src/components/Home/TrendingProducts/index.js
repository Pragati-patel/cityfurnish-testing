import React, { useEffect } from "react";
import styles from "./style.module.css";
import Card from "@/components/Common/HomePageCards";
import { useQuery } from "@/hooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { addtrendingproduct } from "@/store/Slices";
import { endPoints } from "@/network/endPoints";
import { productImageBaseUrl } from "@/constants/constant";

const TrendingProducts = () => {
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cityId = homePageReduxData.cityId;

  const { trendindProduct: getTrendingProducts } = useSelector(
    state => state.homePagedata,
  );
  const dispatch = useDispatch();

  const { refetch: getTrendyProducts } = useQuery(
    "trendy-product",
    endPoints.trendingProduct,
    `?cityId=${cityId}&userId=${85757}`,
  );

  useEffect(() => {
    getTrendyProducts()
      .then(res => {
        dispatch(addtrendingproduct(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>Crowd Favourite</h2>
      <h3 className={styles.subHeading}>Best Selling Products</h3>
      <div className={styles.card_box}>
        {getTrendingProducts?.map((item, index) => (
          <div key={index.toString()} className="mr-4">
            <Card
              cardImage={productImageBaseUrl + item.image.split(",")[0]}
              desc={item.product_name}
              originalPrice={item.price}
              currentPrice={item.sale_price}
              discount={`${Math.round(
                ((item.price - item.sale_price) * 100) / item.price,
              ).toFixed(2)}%`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrendingProducts;
