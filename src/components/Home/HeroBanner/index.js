"use client";
// import {HeroBannerImages} from "@/assets/images";
import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
// import Image from "next/image";
// import {baseInstance} from "@/network/axios";
// import {endPoints} from "@/network/endPoints";
// import {BASEURL} from "../../../../appConfig";
// import {getLocalStorage} from "@/constants/constant";

const HeroBanner = () => {
  const router = useRouter();
  // const cityId = getLocalStorage("cityId");
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [setshowLinkForRentPage, setSetshowLinkForRentPage] = useState(
    homePageReduxData.showAllRentLink,
  );

  const carouselImg = [
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_11.webp",
      link: `/${homePageReduxData?.cityName
        .replace(/\//g, "-")
        ?.toLowerCase()}/home-furniture-rental`,
    },
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_12.webp",
      link: `/${homePageReduxData?.cityName
        .replace(/\//g, "-")
        ?.toLowerCase()}/home-appliances-rental`,
    },
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_2.webp",
      link: "/citymax",
    },
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_13.webp",
      link: `/${homePageReduxData?.cityName
        .replace(/\//g, "-")
        ?.toLowerCase()}/discount-deals`,
    },
  ];
  // const getBanners = () => {
  //   baseInstance
  //     .get(BASEURL + endPoints.getHomeBanners(cityId))
  //     .then(res => console.log(res, "pp"))
  //     .catch(err => console.log(err));
  // };
  const handleRedirection = link => {
    if (setshowLinkForRentPage) {
      router.push(link);
    }
  };

  useEffect(() => {
    setSetshowLinkForRentPage(homePageReduxData.showAllRentLink);
  }, [homePageReduxData.showAllRentLink]);
  // useEffect(() => {
  //   getBanners();
  // }, []);
  return (
    <div>
      <div className={`${styles.hero_banner_wrapper} flex-col`}>
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {carouselImg?.map((item, index) => {
            return (
              <div
                className="flex cursor-pointer"
                key={index.toString()}
                onClick={() => {
                  handleRedirection(item?.link);
                }}>
                <img
                  src={item?.img}
                  alt={"CarouselImg-" + index + 1}
                  width={926}
                  height={386}
                  className="cursor-pointer rounded-lg"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};
export default HeroBanner;
