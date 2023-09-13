"use client";
import React, {useEffect, useState, useRef} from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {Icons, RecentIcon, TrendingIcon} from "@/assets/icon";
import CommonDrawer from "../Drawer";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {
  addCityList,
  selectedCityId,
  addSidebarMenuLists,
  getCartItems,
  selectedCityName,
} from "@/store/Slices";
import {useDispatch, useSelector} from "react-redux";
import {useAppSelector} from "@/store";
import {useRouter} from "next/navigation";
// import Link from "next/link";
import {
  getLocalStorage,
  productImageBaseUrl,
  setLocalStorage,
} from "@/constants/constant";
import axios from "axios";
import {baseURL} from "@/network/axios";
import ProfileDropDown from "./ProfileDropDown";

const HEADER_HEIGHT = 48;

const Header = () => {
  const iconRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSearchbar, setOpenSearchBar] = React.useState(false);
  const {cityList: storeCityList, sidebarMenuLists: storeSideBarMenuLists} =
    useAppSelector(state => state.homePagedata);
  const {refetch: getCityList} = useQuery("city-list", endPoints.cityList);
  const {refetch: getTrendingSearch} = useQuery(
    "trending-search",
    endPoints.trendingSearchConstants,
  );
  const {refetch: getSidebarMenuList} = useQuery(
    "sideBarMenuLists",
    endPoints.sidebarMenuLists,
  );
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [topOffset, settopOffset] = useState(0);
  const [arr, setArr] = React.useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const wishListCount = categoryPageReduxData?.savedProducts?.length;
  useEffect(() => {
    const cityId = getLocalStorage("cityId");
    getCityList()
      .then(res => {
        if (cityId) {
          const cityName = res.data.data.find(
            item => item?.id === cityId,
          ).list_value;
          dispatch(selectedCityName(cityName));
        }
        dispatch(addCityList(res?.data?.data));
        dispatch(selectedCityId(res?.data?.data[0]?.id));
      })
      .catch(err => console.log(err));
    getTrendingSearch()
      .then(res => {
        setArr(res?.data?.data);
      })
      .catch(err => console.log(err));

    getSidebarMenuList().then(res => {
      dispatch(addSidebarMenuLists(res?.data?.data));
    });
  }, []);

  const cityId = getLocalStorage("cityId");

  const cartItemsLength = useSelector(
    state => state.cartPageData.cartItems.length,
  );

  const userId = getLocalStorage("user_id");
  const tempUserId = getLocalStorage("tempUserID");
  const userIdToUse = userId || tempUserId;

  // added for cart icons
  const fetchCartItems = () => {
    axios
      .get(baseURL + endPoints.addToCart.fetchCartItems(cityId, userIdToUse))
      .then(res => {
        // console.log(res, "res in fetch itemms");
        setArr(res?.data?.data);
        dispatch(getCartItems(res?.data?.data));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (iconRef.current && !iconRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const toggleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  useEffect(() => {}, [categoryPageReduxData?.savedProducts?.length]);

  const data = {
    userId: getLocalStorage("user_id") ?? "",
    // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    tempUserId: getLocalStorage("tempUserID"),
  };

  useEffect(() => {
    axios
      .post(baseURL + endPoints.sessionUserUrl, data)
      .then(res => {
        if (userId) {
          setLocalStorage("user_id", res?.data?.data?.userId);
          setLocalStorage("user_name", res?.data?.data?.userName);
        } else {
          setLocalStorage("tempUserID", res?.data?.data?.tempUserId);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.header_wrapper}>
          <div className={styles.header_left_wrapper}>
            <CommonDrawer data={storeSideBarMenuLists} DrawerName="menu" />
            <p
              className={styles.logo_text_main_header}
              onClick={() => router.push("/cityfurnish")}>
              cityfurnish
            </p>
            <div className={styles.header_city_wrapper}>
              <div className={styles.header_city_name}>
                <CommonDrawer Cities={storeCityList} DrawerName="cities" />
              </div>
            </div>
          </div>
          <div className={styles.header_right_wrapper}>
            {!openSearchbar && (
              <div className={styles.open_searchbar_main}>
                <div
                  className={styles.search_wrapper}
                  onClick={() => {
                    setOpenSearchBar(!openSearchbar);
                    const SCREEN_TYPE_OFFSET =
                      window.screen.availWidth <= 768 ? 20 : 40;
                    if (window.pageYOffset <= HEADER_HEIGHT) {
                      settopOffset(
                        (!homePageReduxData.announcementBar
                          ? SCREEN_TYPE_OFFSET + HEADER_HEIGHT
                          : HEADER_HEIGHT) - window.pageYOffset,
                      );
                    } else settopOffset(SCREEN_TYPE_OFFSET);
                  }}>
                  <input
                    placeholder="Search for Furniture, Appliances, etc"
                    className={styles.search_input}
                  />
                  <Image
                    src={Icons.Search}
                    alt="search-icon"
                    className={styles.header_search_icon}
                  />
                </div>
              </div>
            )}
            {openSearchbar && (
              <>
                <SearchModal
                  arr={arr}
                  topOffset={topOffset}
                  openSearchbar={openSearchbar}
                  setOpenSearchBar={setOpenSearchBar}
                />
              </>
            )}
            <div className="relative flex">
              <span className={styles.header_favorite_container}>
                <Image
                  src={Icons.Favorite}
                  alt="favorite"
                  className={styles.header_favorite}
                  onClick={() => {
                    if (userId) {
                      router.push("/wishlist");
                    } else {
                      // router.push("/wishlist");
                      router.push(
                        "https://test.rentofurniture.com/user_sign_up",
                      );
                    }
                  }}
                />
                {categoryPageReduxData?.savedProducts?.length > 0 ? (
                  <span className={styles.header_favorite_count}>
                    {wishListCount}
                  </span>
                ) : (
                  <></>
                )}
              </span>
              {/* <Link href={`/cart`}> */}

              <div className="relative">
                {/* <Image
                  src={Icons.shoppingCard}
                  alt="shopping-card-icon"
                  className={styles.header_shopping_card}
                  onClick={() => router.push("https://cityfurnish.com/cart")}
                /> */}
                <Image
                  src={Icons.shoppingCard}
                  alt="shopping-card-icon"
                  className={styles.header_shopping_card}
                  onClick={() => router.push("/cart")}
                />
                {cartItemsLength > 0 && (
                  <div className={styles.cart_badge}>{cartItemsLength}</div>
                )}
              </div>
              {/* </Link> */}
              <Image
                src={Icons.Profile}
                alt="profile-icon"
                className={`${styles.header_profile_icon} relative`}
                onClick={() => {
                  if (getLocalStorage("user_id") === null) {
                    router.push("https://test.rentofurniture.com/user_sign_up");
                  } else {
                    toggleDropdown();
                    // setShowProfileDropdown(!showProfileDropdown);
                  }
                }}
                ref={iconRef}
              />
              {getLocalStorage("user_id") !== null && showProfileDropdown && (
                <ProfileDropDown
                  setShowProfileDropdown={setShowProfileDropdown}
                  showProfileDropdown={showProfileDropdown}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.mobile_search_row}>
          <div className={styles.search_wrapper_mobile} style={{width: "100%"}}>
            <input
              placeholder="Search for Furniture, Appliances, etc"
              className={styles.search_input}
              onClick={() => {
                // setOpenSearchBar(!openSearchbar);
                settopOffset(65 - window.pageYOffset);
              }}
            />
            <Image
              src={Icons.Search}
              alt="search-icon"
              className={styles.header_search_icon}
            />
          </div>

          {openSearchbar && (
            <>
              <SearchModal
                arr={arr}
                openSearchbar={openSearchbar}
                setOpenSearchBar={setOpenSearchBar}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;

// search modal component
const SearchModal = ({arr, setOpenSearchBar, openSearchbar, topOffset}) => {
  const modalRef = useRef(null);
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchedData, setSearchedData] = React.useState();
  const [searchApiData, setSearchApiData] = React.useState(null);

  const handleSearch = e => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const city = getLocalStorage("cityId");

    axios.get(baseURL + endPoints.searchKey(newSearchTerm, city)).then(res => {
      setSearchApiData(res?.data?.data);
    });

    // Store search term in local storage
    if (e.key === "Enter" || e.type === "click") {
      if (newSearchTerm.trim() !== "") {
        // const storedSearches = localStorage.getItem("searches");
        let storedSearches;
        const searchesArray = storedSearches ? JSON.parse(storedSearches) : [];
        searchesArray.unshift(newSearchTerm);
        const maxItems = 5;
        const truncatedArray = searchesArray.slice(0, maxItems);
        if (typeof window !== "undefined") {
          const existingLocal = getLocalStorage("searches");
          if (existingLocal) {
            setLocalStorage("searches", [...existingLocal, truncatedArray]);
          } else {
            setLocalStorage("searches", truncatedArray);
          }
          storedSearches = getLocalStorage("searches");
        }
        setSearchedData(storedSearches);
        router.push(`/search/${truncatedArray[0]}`);
      }
    }
  };
  const handleTrending = (item, event) => {
    event.stopPropagation();
    const newSearchTerm = event.target.value;
    axios.get(baseURL + endPoints.searchKey + item).then(res => {
      setSearchApiData(res?.data?.data);
      setSearchedData(prev => [...prev, item]);
      const existingLocal = getLocalStorage("searches");
      let storedSearches;
      const searchesArray = storedSearches ? JSON.parse(storedSearches) : [];
      searchesArray.unshift(newSearchTerm);
      const maxItems = 5;
      const truncatedArray = searchesArray.slice(0, maxItems);
      if (existingLocal) {
        setLocalStorage("searches", [...existingLocal, truncatedArray]);
      } else {
        setLocalStorage("searches", truncatedArray);
      }
    });
    const itm = [item];
    console.log(itm, "itmmmmm");
    onSearchClick(itm);
  };

  useEffect(() => {
    setSearchedData(getLocalStorage("searches") || ["No search history"]);
  }, []);

  const onSearchClick = item => {
    console.log(item[0]);
    router.push(`/search/${item[0]}`);
  };

  return (
    <div className={styles.backdrop} onClick={() => setOpenSearchBar(false)}>
      <div
        style={{
          top: `${
            !homePageReduxData?.announcementBar ? topOffset : topOffset
          }px`,
        }}
        ref={modalRef}
        className={` ${
          homePageReduxData?.announcementBar
            ? `w-full absolute top-[${topOffset}px] md:top-[16px] lg:top-[44px] md:right-[19%] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px]`
            : `w-full absolute md:right-[19%] lg:right-[21%] xl:right-[19%] xl:w-[345px] md:w-[300px]`
        }
`}>
        <div className={styles.search_wrapper_mobile}>
          <input
            placeholder="Search for Furniture, Appliances, etc"
            className={styles.search_input}
            value={searchTerm}
            onChange={e => handleSearch(e)}
          />
          <Image
            src={Icons.Search}
            alt="search-icon"
            className={styles.header_search_icon}
          />
        </div>
        <div
          className={`${styles.search_wrapper}`}
          onClick={e => e.stopPropagation()}>
          <Image
            src={Icons.Search}
            alt="search-icon"
            className={styles.header_search_icon}
          />
          <input
            placeholder="Search for Furniture, Appliances, etc"
            className={styles.search_input}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => handleSearch(e)}
          />
        </div>

        <div
          className={styles.search_open_details}
          open={open}
          onClick={e => {
            e.stopPropagation();
          }}>
          <div>
            {searchApiData &&
              searchApiData?.products?.map((item, index) => (
                <div
                  className={styles.search_rasult_wrapper}
                  key={index.toString()}
                  onClick={() =>
                    router.push(`/things/${item.id}/${item.seourl}`)
                  }>
                  <img
                    src={productImageBaseUrl + item?.image?.split(",")[0]}
                    alt={item?.image}
                    className={styles.serach_result_img}
                  />
                  <p className={styles.search_result_text}>
                    {item.product_name?.replace(/-/g, " ")}
                  </p>
                </div>
              ))}

            {searchApiData &&
              searchApiData?.categories?.map((item, index) => (
                <div
                  className={styles.search_rasult_wrapper}
                  key={index.toString()}
                  onClick={() =>
                    router.push(`/things/${item.id}/${item.seourl}`)
                  }>
                  <img
                    src={productImageBaseUrl + item?.image?.split(",")[0]}
                    alt={item?.image}
                    className={styles.serach_result_img}
                  />
                  <p className={styles.search_result_text}>
                    {item.product_name?.replace(/-/g, " ")}
                  </p>
                </div>
              ))}
          </div>
          <div>
            <p className={styles.search_head}>Recent</p>
            <div className={styles.pills_wrapper}>
              {searchedData?.map((item, index) => {
                return (
                  <>
                    {index < 5 && (
                      <div
                        key={index.toString()}
                        className={styles.pill}
                        onClick={() => {
                          onSearchClick(item);
                        }}>
                        <RecentIcon
                          className={styles.modal_icon}
                          color={"#E0806A"}
                        />
                        <p className={styles.pill_text}>{item}</p>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div className="mt-6"></div>
            <p className={styles.search_head}>Trending searches</p>
            <div className={styles.pills_wrapper}>
              {arr?.map((item, index) => (
                <div
                  key={index.toString()}
                  className={styles.pill}
                  onClick={event => handleTrending(item, event)}>
                  <TrendingIcon
                    className={styles.modal_icon}
                    color={"#2D9469"}
                  />
                  <p className={styles.pill_text}>{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className={styles.search_head}>Categories</p>
              <div className={`${styles.categories_wrapper}`}>
                {homePageReduxData?.category?.map((item, index) => (
                  <a
                    key={index.toString()}
                    href={`${homePageReduxData?.cityName.toLowerCase()}/${
                      item?.seourl
                    }`}>
                    <div
                      className={styles.category_card_in_searchbox}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          setLocalStorage("categoryId", item?.rootID);
                          setLocalStorage("subCategoryId", item?.id);
                        }
                      }}>
                      <img
                        src={
                          "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimages/" +
                          item.category_image
                        }
                        alt="RentFurnitureImages"
                        className={styles.categories_img}
                      />
                      <div>
                        <h3 className={styles.category_label}>
                          {item?.cat_name}
                        </h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
