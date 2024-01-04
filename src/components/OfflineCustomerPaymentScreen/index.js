import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {ImCheckmark} from "react-icons/im";
import otherStyles from "../MyOrders/orders/partTwo/styles.module.css";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useParams, useRouter} from "next/navigation";
import {loadScript} from "@/constants/constant";
import {RazorpayThemeColor, razorpayKeyOwn} from "../../../appConfig";
import {ArrowForw} from "@/assets/icon";

const OfflinePayment = () => {
  const params = useParams();
  const router = useRouter();
  console.log(params);
  const [details, setDetails] = useState();

  const mapData = ["Advanced payment", "Final payment"];

  useEffect(() => {
    axios
      .get(
        baseURL +
          endPoints.offlinePayment.getOfflineCutomerDetails(
            parseInt(params.orderId),
          ),
      )
      .then(res => {
        setDetails(res?.data?.data);
      });
  }, []);

  async function handleOpenRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res, " res in load script");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      baseURL + endPoints.tenureExtensionCreateOrder,
      {
        dealCodeNumber: params.orderId,
        mode: "offline",
      },
    );
    console.log(result.data.data, "tenure extension data");
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const razOrderId = result.data.data.raz_order_id;
    const customerId = result.data.data.customer_id;
    console.log(razOrderId, customerId, "huhwiuhij");

    const options = {
      key: razorpayKeyOwn,
      order_id: razOrderId,
      customer_id: customerId,
      name: "Cityfurnish",
      description: "Easy payment registration",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      handler: async function (response) {
        console.log(response, "response in handlerfunc");
        if (response.error) {
          alert("Payment failed. Please try again.");
          router.push("/order/failure");
        } else {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            dealCodeNumber: params.orderId,
            razorpayOrderId: response.razorpay_order_id,
            razCustomerId: customerId,
            razorpaySignature: response.razorpay_signature,
          };

          const res = await axios.post(
            baseURL + endPoints.addToCart.successPayment,
            data,
          );
          console.log(res, "result in handler");
          router.push(`/order/confirmation/cart?oid=${params.orderId}`);
        }
      },
      prefill: {
        name: result?.data?.data?.data?.full_name,
        email: result?.data?.data?.data?.email,
        contact: result?.data?.data?.data?.phone_no,
      },
      theme: {
        color: RazorpayThemeColor,
      },
    };

    console.log(options, "optionss");

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.log("Payment failed:", response.error.description);
      alert("Payment failed: " + response.error.description);
    });

    paymentObject.open();
  }

  return (
    <div className={styles.main_container}>
      <p className={styles.head}>Offline Payment</p>
      <div className="mt-6 xl:mt-8">
        <div className={otherStyles.upper_map}>
          {mapData?.map((item, index) => {
            return (
              <div key={index} className={otherStyles.progress_map_item}>
                <div
                  className={`${
                    index === 0
                      ? otherStyles.active_status
                      : otherStyles.inactive_status
                  } ${otherStyles.progress_circle}`}>
                  {index === 0 ? (
                    <ImCheckmark className={otherStyles.check_icon} />
                  ) : (
                    <div className={otherStyles.inner_circle}></div>
                  )}
                </div>

                {index === 0 && <div className={`${otherStyles.line}`}></div>}
                <div>
                  <p className={otherStyles.progress_status}>{item}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.details_wrapper}>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            Your Order ID
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            {details?.dealCodeNumber}
          </p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>
            Advance Paid
          </p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            <span className={styles.rupeeicon}>₹</span>
            {details?.advance_rental}
          </p>
        </div>
        <div className={styles.row}>
          <p className={`w-[123px] md:w-[236px] ${styles.desc}`}>Due amount</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>
            <span className={styles.rupeeicon}>₹</span>
            {details?.due_amount}
          </p>
        </div>
        <div className={styles.row}>
          <p className={styles.desc}>
            Please pay due amount of <span className={styles.rupeeicon}>₹</span>
            {details?.due_amount} to confirm your order
          </p>
        </div>
      </div>

      <div onClick={handleOpenRazorpay} className={styles.yellowbtn}>
        Pay now
        <ArrowForw size={19} color={"#222"} />
      </div>
    </div>
  );
};

export default OfflinePayment;