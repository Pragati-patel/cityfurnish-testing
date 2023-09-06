import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import {useSelector} from "react-redux";
// import {productImageBaseUrl} from "@/constants/constant";

const SubCategorySection = () => {
  const [isDumy, setIsDumy] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const homePageReduxData = useSelector(state => state.homePagedata);
  const data = homePageReduxData?.allAndSubCategory;

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsdragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    slider.addEventListener("mousemove", toggleIsdragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsdragging);
    };
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      {data?.map((item, index) => {
        return (
          <>
            <div
              className={
                item?.cat_name === "Home Furniture"
                  ? styles.heading_container_home_furniture
                  : styles.heading_container
              }>
              {/* <div className='flex w-full justify-between'> */}
              <h1 className={styles.heading}>{item?.cat_name}</h1>
              <div className={styles.viewButton}>
                <p className={styles.viewAllText}>
                  {windowSize[0] > 450 ? "View all home furniture" : "View all"}
                </p>
                <ForwardArrow
                  size={windowSize[0] > 768 ? 20 : 16}
                  color={"#597492"}
                />
              </div>
            </div>
            <div className={styles.category_section_container} ref={sliderRef}>
              {item?.sub_categories.map((subItem, index) => {
                return (
                  <div className={styles.card_container} key={index.toString()}>
                    <div className="w-[79.2px] ms:w-[245px]">
                      <img
                        src={
                          "https://d3juy0zp6vqec8.cloudfront.net/images/category/" +
                          subItem?.category_web_image
                        }
                        className="!w-full rounded-[6.4px] ms:rounded-none"
                      />
                    </div>
                    <h3 className={styles.card_text}>{subItem?.cat_name}</h3>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

// export async function getServerSideProps() {
//   // Fetch your data here, you can use any data fetching library or API call
//   const response = await fetch("https://api.example.com/subcategorydata");
//   const data = await response.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default SubCategorySection;
