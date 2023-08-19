import React, {useEffect} from "react";
import styles from "./style.module.css";
import {HomePageImages} from "@/assets/images";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
// import {productPageImagesBaseUrl} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import {addCareInstructions} from "@/store/Slices";

const CareInstruction = () => {
  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData);
  useEffect(() => {
    axios
      .get(baseURL + endPoints.productPage.careInstructions)
      .then(res => {
        dispatch(addCareInstructions(res?.data?.data));
        console.log(res, "res on product");
      })
      .catch(err => {
        console.log(err);
        dispatch(addCareInstructions([]));
      });
  }, []);

  return (
    <div className={styles.main_container}>
      <h2 className={styles.head}>Care Instructions</h2>
      <div className={styles.card_wrapper}>
        {pageData?.careInstructions.map((item, index) => (
          <div key={index}>
            <img
              // src={`${productPageImagesBaseUrl + item?.file_name}`}
              src={HomePageImages.office}
              className={styles.img}
              alt="card_img"
            />
            <p className={styles.card_head}>{item.title}</p>
            <p className={styles.card_desc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareInstruction;