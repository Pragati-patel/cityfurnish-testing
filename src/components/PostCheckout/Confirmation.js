import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {FaCheck} from "react-icons/fa";
import {useRouter, useSearchParams} from "next/navigation";
import {setOrderIdFromOrderPage} from "@/store/Slices";
import {useDispatch} from "react-redux";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";

const PaymentConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const oid = searchParams.get("oid");

  const [timer, setTimer] = useState(5);
  const [transactionId, setTransactionId] = useState(null);
  const [skeletonLoder, setSkeletonLoder] = useState(true);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    if (timer <= 1) {
      clearInterval(countdown); // Stop the countdown
      dispatch(setOrderIdFromOrderPage(oid));
      router.replace("/documentation");
    }
    return () => clearInterval(countdown);
  }, [router, timer]);

  const getTransactionId = id => {
    axios
      .get(baseURL + endPoints.addToCart.getTransactionId(id))
      .then(res => {
        setTransactionId(res?.data?.data?.paypal_transaction_id);
        setSkeletonLoder(false);
      })
      .catch(err => {
        console.log(err);
        setSkeletonLoder(false);
      });
  };
  useEffect(() => {
    getTransactionId(oid);
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.success_icon_div}>
        <FaCheck color={"white"} className={styles.checkIcon} />
      </div>

      <p className={styles.head}>
        Congratulations! We have received your order.
      </p>
      <div className={styles.details_wrapper}>
        <div className={styles.row}>
          <p className={`w-[149px] ${styles.desc}`}>Your Order ID</p>
          <p className={styles.desc}>:</p>
          <p className={`font-medium ${styles.desc}`}>#{oid}</p>
        </div>
        <div className={styles.row}>
          <p className={`w-[149px] ${styles.desc}`}>Your Transaction ID</p>
          <p className={styles.desc}>:</p>
          {skeletonLoder ? (
            <Skeleton variant="text" width={100} />
          ) : (
            <p className={`font-medium ${styles.desc}`}>{transactionId}</p>
          )}
        </div>
      </div>

      <div className={styles.next_step_wrapper}>
        <p className={styles.next_steps_header}>
          For the next steps, you will be redirected to KYC & Documentation page
          in {timer} {timer === 1 ? "second." : "seconds."}
        </p>
        <ul className={styles.steps}>
          <div className={styles.row}>
            <div className={styles.dot}></div>
            <li className={styles.desc}>
              Please verify your KYC within next 48 hours.
            </li>
          </div>

          <div className={styles.row}>
            <div className={styles.dot}></div>
            <li className={styles.desc}>
              Once your KYC is verified, we will be delivering your order within
              72 hours.
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
