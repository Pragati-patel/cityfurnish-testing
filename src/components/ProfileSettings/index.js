import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {ArrowForw} from "@/assets/icon";
import {cityUrl} from "../../../appConfig";
import formStyles from "../Cart/AddressSection/styles.module.css";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";

import axios from "axios";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import FormSkeleton from "../Common/FormSkeleton";
// import withAuth from "@/components/Hoc/withAuth";

const ProfileSettings = () => {
  const [emailState, setEmailState] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [sentOtp, setSentOtp] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const useridFromStorage = decrypt(getLocalStorage("_ga"));
  const [userId, setUserId] = useState(useridFromStorage);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    setUserId(useridFromStorage);
  }, [useridFromStorage]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    contactNumber: Yup.string()
      .test(
        "no-spaces-special-characters",
        "Please enter a valid 10 digit phone number without spaces or special characters",
        value => {
          return /^[0-9]*$/.test(value);
        },
      )
      .min(
        10,
        "Oops! Looks like you missed some digits. Please enter complete 10 digit number.",
      )
      .max(
        10,
        "Oops! It looks like you entered too many digits. Please enter valid 10 digit number.",
      )
      .required("Contact number is required"),
    email: Yup.string().email().required("email is required"),
  });

  useEffect(() => {
    let timer;
    if (countdown > 0 && showOtpInput) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setShowOtpInput(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, showOtpInput]);

  const fetchUserDetails = async () => {
    console.log(useridFromStorage, "uiwii");
    try {
      const response = await axios.get(
        baseURL + endPoints.profileSettingPage.getUserDetails(userId),
      );
      console.log(response?.data?.data, "ressss");
      setUserDetails({...response?.data?.data});
      setEmailState(response?.data?.data?.is_verified);
      setLoadingSkeleton(false);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(userDetails, "userrrr");

  const sendOTP = async email => {
    setCountdown(60);
    // try {
    //   const headers = {
    //     email,
    //   };
    //   const response = await axios.post(baseURL + endPoints, headers);

    //   if (response.status === 200) {
    //     console.log("OTP sent successfully");
    //   } else {
    //     const data = await response.data;
    //     console.log(data.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    setShowOtpInput(true);
    setSentOtp(true);
  };

  const handleOtpVerification = () => {};

  const handleUpdateUserDetails = async values => {
    try {
      const headers = {
        id: parseInt(userId),
        full_name: values.fullName,
        phone_no: values.contactNumber,
        email: values.email,
        is_verified: emailState,
      };
      axios.patch(
        baseURL + endPoints.profileSettingPage.updateUserDetails,
        headers,
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <div>
          <h1 className={styles.header}>Profile Settings</h1>
        </div>
        <div className={styles.line}></div>

        {loadingSkeleton ? (
          <div className="w-2/3">
            <FormSkeleton />
          </div>
        ) : (
          <div className={styles.form_wrapper}>
            <Formik
              initialValues={{
                fullName: userDetails?.full_name || "",
                contactNumber: userDetails?.phone_no || "",
                email: userDetails?.email || "",
              }}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={values => {
                handleUpdateUserDetails(values);
                // getAllSavedAddresses();
                // resetForm();
              }}>
              {formik => (
                <Form className={styles.form_wrapper}>
                  <div>
                    <div className={formStyles.form_field}>
                      <p className={formStyles.form_label}>Full name</p>
                      <Field
                        type="text"
                        name="fullName"
                        // value={formik.values.fullName}
                        placeholder="Enter your name"
                        className={formStyles.form_input}
                      />
                      <ErrorMessage name="fullName">
                        {msg =>
                          formik.touched.fullName && (
                            <p className={formStyles.error}>{msg} </p>
                          )
                        }
                      </ErrorMessage>
                    </div>

                    <div className={formStyles.form_field}>
                      <p className={formStyles.form_label}>Contact number</p>
                      <div className={`${styles.row} ${formStyles.form_input}`}>
                        <div className="flex gap-2 items-center">
                          <img
                            src={`${cityUrl + "india-icon.svg"}`}
                            className={formStyles.flag}
                            loading="lazy"
                          />
                          <Field
                            type="number"
                            // readOnly
                            name="contactNumber"
                            value={formik.values.contactNumber}
                            placeholder="Enter 10 digit number "
                            className={formStyles.contact_input}
                          />
                        </div>
                        <p className={styles.changeTxt}>Change</p>
                      </div>
                      <ErrorMessage name="contactNumber">
                        {msg =>
                          formik.touched.contactNumber && (
                            <p className={formStyles.error}>{msg} </p>
                          )
                        }
                      </ErrorMessage>
                    </div>

                    <div className={formStyles.form_field}>
                      <p className={formStyles.form_label}>
                        Email
                        <span
                          className={`${
                            userDetails?.is_verified === "Yes"
                              ? styles.green
                              : styles.red
                          }`}>
                          (
                          {userDetails?.is_verified === "Yes"
                            ? "Verified"
                            : "Unverified"}
                          )
                        </span>
                      </p>
                      <div className={`${styles.row} ${formStyles.form_input}`}>
                        <Field
                          type="email"
                          name="email"
                          value={formik.values.email}
                          placeholder="Enter your email"
                          className={formStyles.contact_input}
                        />
                        {userDetails?.is_verified === "No" &&
                          formik.values.email !== "" &&
                          (showOtpInput ? (
                            <p className={`${styles.timerTxt}`}>
                              Resend OTP{" "}
                              <span className="font-normal">
                                {countdown} secs
                              </span>
                            </p>
                          ) : (
                            <p
                              onClick={() => {
                                console.log(formik, "formiikk");
                                sendOTP(formik.values.email);
                              }}
                              className={styles.changeTxt}>
                              {sentOtp ? "Resend OTP" : "Verify"}
                            </p>
                          ))}
                      </div>
                      <ErrorMessage name="email">
                        {msg =>
                          formik.touched.email && (
                            <p className={formStyles.error}>{msg}</p>
                          )
                        }
                      </ErrorMessage>
                    </div>

                    {showOtpInput && (
                      <div className={formStyles.form_field}>
                        <p className={formStyles.form_label}>
                          Provide your OTP
                        </p>
                        <div
                          className={`${styles.row} ${formStyles.form_input}`}>
                          <Field
                            type="number"
                            name="otp"
                            placeholder="Enter the OTP you just received"
                            className={formStyles.contact_input}
                          />
                          {userDetails?.is_verified === "No" && (
                            <p
                              onClick={handleOtpVerification}
                              className={styles.changeTxt}>
                              Verify
                            </p>
                          )}
                        </div>
                        {/* <ErrorMessage name="email">
                        {msg =>
                          formik.touched.email && (
                            <p className={formStyles.error}>{msg}</p>
                          )
                        }
                      </ErrorMessage> */}
                      </div>
                    )}

                    <div className={styles.btn_wrapper}>
                      <button type="submit" className={styles.btn}>
                        Save changes
                        <ArrowForw className={styles.forw_arrow} />
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
