import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow} from "@/assets/icon";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import CancelOrder from "./CancelOrder";
import CancelMandate from "./CancelMandate";
import SwapProduct from "./SwapProduct";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import Buy from "./Buy";
import Repair from "./Repair";
import ExtendTenure from "./ExtendTenure";
import ChangeBillCycle from "./ChangeBillCycle";
import Relocation from "./Relocation";
import {useDispatch} from "react-redux";
import {setServiceRequestType} from "@/store/Slices";
import TransferOwnership from "./TransferOwnership";
import {useRouter} from "next/navigation";

function ServiceRequestType({
  orderId,
  isHelpDrawer,
  title,
  setShowNextComponent,
  isSubscription,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = decrypt(getLocalStorage("_ga"));
  const [servicesType, setServicesType] = useState();
  const [selectedType, setSelectedType] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(true);
  const [productDetail, setProductDetail] = useState(null);

  const getServicesType = () => {
    axios
      .get(baseURL + endPoints.myOrdersPage.getServiceRequest(orderId))
      .then(res => {
        setServicesType(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  const getProductLists = () => {
    axios
      .get(
        baseURL + endPoints.serviceRequestPage.getProductLists(orderId, userId),
      )
      .then(res => {
        setProductDetail(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getServicesType();
    getProductLists();
  }, []);

  useEffect(() => {
    dispatch(setServiceRequestType(selectedType));
  }, [selectedType]);

  // const handleDownload = () => {
  //   const anchor = document.createElement("a");
  //   anchor.href = invoiceUrl;
  //   anchor.download = "invoice.pdf"; // Set the desired file name
  //   document.body.appendChild(anchor);

  //   // Trigger a click event on the anchor element to initiate the download
  //   anchor.click();

  //   // Remove the anchor element from the DOM
  //   document.body.removeChild(anchor);
  // };

  return (
    <>
      {currentScreen ? (
        <div className={styles.content_wrapper}>
          <div className={styles.main_heading}>
            {!isHelpDrawer && (
              <BackIcon
                className={"cursor-pointer"}
                onClick={() => setShowNextComponent(false)}
              />
            )}
            {title}
          </div>
          <div className={` my-6 flex w-full flex-col mt-4`}>
            {servicesType?.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className={` ${
                    index !== servicesType.length - 1
                      ? " border-b border-EDEDEE"
                      : "border-0"
                  } ${styles.request_info_div}`}
                  onClick={() => {
                    setSelectedType(item.key);
                    setCurrentScreen(false);
                  }}>
                  <div className="flex gap-2 items-center">
                    <img
                      className={styles.request_type_icon}
                      src={item.image}
                      alt="icon"
                    />
                    <p className={styles.request_type}>{item.optionValue}</p>
                  </div>
                  <div className="flex">
                    <ForwardArrow />
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.divider_row}>
            <div className={styles.doted_line}></div>
            <div className={styles.or_text}>OR</div>
            <div className={styles.doted_line}></div>
          </div>
          <div className={`${styles.request_type} mt-7`}>Chat with us</div>

          {/* additional */}
          {isHelpDrawer && !isSubscription && (
            <div>
              <p className={styles.additional_content}>Additionally</p>
              <button
                onClick={() =>
                  router.push(`view-purchase/${userId}/${orderId}`)
                }
                className={styles.download_btn}>
                Download invoice
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {selectedType === "cancellation" && (
            <CancelOrder prevScreen={setCurrentScreen} data={productDetail} />
          )}
          {selectedType === "upgrade" && (
            <SwapProduct prevScreen={setCurrentScreen} data={productDetail} />
          )}
          {selectedType === "ownership" && (
            <TransferOwnership
              prevScreen={setCurrentScreen}
              data={productDetail}
            />
          )}
          {selectedType === "buy" && (
            <Buy
              prevScreen={setCurrentScreen}
              data={productDetail}
              heading="Buy"
            />
          )}
          {selectedType === "installation" && (
            <Buy
              prevScreen={setCurrentScreen}
              data={productDetail}
              heading="Installation"
            />
          )}
          {selectedType === "repair" && (
            <Repair prevScreen={setCurrentScreen} data={productDetail} />
          )}
          {selectedType === "full_extension" && (
            <ExtendTenure prevScreen={setCurrentScreen} />
          )}
          {selectedType === "change_bill_cycle" && (
            <ChangeBillCycle
              prevScreen={setCurrentScreen}
              data={productDetail}
            />
          )}
          {selectedType === "relocation" && (
            <Relocation prevScreen={setCurrentScreen} data={productDetail} />
          )}
          {selectedType === "request_pickup" && (
            <Buy
              prevScreen={setCurrentScreen}
              data={productDetail}
              heading="Request order pickup"
            />
          )}
          {selectedType === "cancel_mandate" && (
            <CancelMandate
              prevScreen={setCurrentScreen}
              data={productDetail}
              heading="Cancel mandate"
            />
          )}
        </>
      )}
    </>
  );
}

export default ServiceRequestType;
