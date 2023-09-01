import {DownArrow} from "@/assets/icon";
import styles from "./style.module.css";
import * as React from "react";
import Popover from "@mui/material/Popover";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {
  addProductCategory,
  addProductName,
  addSubCategoryId,
} from "@/store/Slices";
import {
  addAllProduct,
  addFilteredItem,
  addOutStockProduct,
  addOutStockProductAll,
  addParentCategoryId,
  addSetProduct,
  addSetProductAll,
  addSingleAllProduct,
  addSingleProduct,
} from "@/store/Slices/categorySlice";
import {getLocalStorage, setLocalStorage} from "@/constants/constant";

const PopOver = ({list, item, parentCategoryId, data}) => {
  const homePageReduxData = useSelector(state => state.homePagedata);

  const hoverRef = React.useRef("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleCategory = (event, item) => {
    setAnchorEl(event.currentTarget);
    router.push(`/${homePageReduxData?.cityName.toLowerCase()}/${item.seourl}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handMainCategory = e => {
    dispatch(addAllProduct(true));
    // const previouseSubCategory = JSON.parse(
    //   localStorage.getItem("subCategory"),
    // );

    let previouseSubCategory;

    if (typeof window !== "undefined") {
      previouseSubCategory = getLocalStorage("subCategory");
    }
    dispatch(addFilteredItem([]));
    dispatch(addProductCategory(hoverRef.current));

    if (typeof window !== "undefined") {
      setLocalStorage("category", hoverRef.current);
      setLocalStorage("subCategory", "All");
      setLocalStorage("categoryId", data?.id);
    }
    // if (typeof window !== "undefined") {
    //   setLocalStorage("categoryId", mainCategory?.id);
    // }

    dispatch(addParentCategoryId(parentCategoryId));
    dispatch(addProductName(item));
    dispatch(addSubCategoryId(""));
    dispatch(addProductName(null));
    dispatch(addAllProduct(true));
    if (previouseSubCategory !== "All") {
      dispatch(addSingleAllProduct([]));
      dispatch(addSetProductAll([]));
      dispatch(addOutStockProductAll([]));
    }

    setAnchorEl(null);
    router.push(
      `/${homePageReduxData?.cityName.toLowerCase()}/${data?.seourl}`,
    );
  };

  const handleSelectedProduct = (e, item) => {
    dispatch(addFilteredItem([]));
    dispatch(addAllProduct(false));

    const previousSubCategory = JSON.parse(localStorage.getItem("subCategory"));
    router.push(
      `/${homePageReduxData?.cityName.toLowerCase()}/${item?.seourl}`,
    );

    if (typeof window !== "undefined") {
      setLocalStorage("category", hoverRef.current);
      setLocalStorage("categoryId", item?.rootID);
      setLocalStorage("subCategory", item?.cat_name);
      setLocalStorage("subCategoryId", item?.id);
    }
    dispatch(addSubCategoryId(item?.id));
    dispatch(addProductName(item));
    dispatch(addProductCategory(hoverRef.current));
    if (previousSubCategory !== item?.cat_name) {
      dispatch(addSingleProduct([]));
      dispatch(addSetProduct([]));
      dispatch(addOutStockProduct([]));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button
        onClick={e => handleCategory(e, item)}
        className="flex items-center whitespace-nowrap cursor-pointer"
        onMouseEnter={e => {
          setAnchorEl(e.currentTarget);
          hoverRef.current = item;
        }}>
        {item}
        <DownArrow
          size={20}
          color={"#45454A"}
          className={open ? styles.arrow_up : styles.arrow_down}
        />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          marginTop: "0.9rem",
        }}>
        <div className={styles.sub_item_wrapper} onMouseLeave={handleClose}>
          <p className={styles.sub_item} onClick={handMainCategory}>
            All
          </p>
          {list?.map(
            (item, index) => {
              return (
                <p
                  className={styles.sub_item}
                  key={index.toString()}
                  onClick={e => handleSelectedProduct(e, item)}>
                  {item?.cat_name}
                </p>
              );
            },
            // </Link>
          )}
        </div>
      </Popover>
    </div>
  );
};
export default PopOver;
