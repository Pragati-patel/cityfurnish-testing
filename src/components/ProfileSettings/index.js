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
import {showToastNotification} from "../Common/Notifications/toastUtils";
import ChangeNumber from "./Modal/ChangeNumber";
import "react-responsive-modal/styles.css";
import FormSkeleton from "../Common/FormSkeleton";

const ProfileSettings = () => {
  const [emailState, setEmailState] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [sentOtp, setSentOtp] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const useridFromStorage = decrypt(getLocalStorage("_ga"));
  const [userId, setUserId] = useState(useridFromStorage);
  const [otpError, setOtpError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    setUserId(useridFromStorage);
  }, [useridFromStorage]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("email is required"),
  });

  useEffect(() => {
    let timer;

    if (countdown > 0 && showOtpInput) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setSentOtp(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, showOtpInput]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        baseURL + endPoints.profileSettingPage.getUserDetails(userId),
      );
      setLoadingSkeleton(false);
      setUserDetails({...response?.data?.data});
      setEmailState(response?.data?.data?.is_verified);
    } catch (err) {
      console.log(err);
    }
  };

  const sendOTP = async email => {
    setCountdown(60);
    setOtpError("");
    try {
      const headers = {
        email,
      };
      const response = await axios.post(
        baseURL + endPoints.profileSettingPage.sentOtpToEmail,
        headers,
      );

      if (response?.data?.success === true) {
        console.log("OTP sent successfully");
        setShowOtpInput(true);
        setSentOtp(true);
      } else {
        const data = await response.data;
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailChange = val => {
    if (val !== userDetails?.email) setEmailState("No");
    else setEmailState(userDetails?.is_verified);
  };

  const handleOtpVerification = async (email, otp) => {
    if (countdown === 0) {
      setOtpError(
        "Sorry, your OTP has timed out. Please request a new OTP to continue.",
      );
    } else {
      const body = {
        email,
        otp,
      };
      axios
        .post(baseURL + endPoints.profileSettingPage.sentOtpToEmail, body, {
          headers: {
            userid: userId,
          },
        })
        .then(response => {
          if (response?.data?.message === "OTP verified successfully") {
            console.log("OTP verified successfully");
            setEmailState("Yes");
            setShowOtpInput(false);
            setSentOtp(false);
          } else {
            console.log(response?.data?.message);
          }
        })
        .catch(err => {
          console.log(err);
          setOtpError(
            "The OTP you entered is not valid. Please make sure you entered the OTP correctly and try again.",
          );
        });
    }
  };

  const handleUpdateUserDetails = async values => {
    try {
      const headers = {
        id: parseInt(userId),
        full_name: values.fullName,
        phone_no: values.contactNumber,
        email: values.email,
        is_verified: emailState,
      };
      await axios.patch(
        baseURL + endPoints.profileSettingPage.updateUserDetails,
        headers,
      );
      showToastNotification("Your changes are saved successfully", 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main_container}>
      <ChangeNumber
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        contactNumber={userDetails?.phone_no}
        userId={userId}
      />
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <div>
          <h1 className={styles.header}>Profile Settings</h1>
        </div>
        <div className={styles.line}></div>
        <div>
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
                  otp: "",
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
                        <div
                          className={`${styles.row} ${formStyles.form_input}`}>
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
                          <p
                            onClick={() => openModal()}
                            className={styles.changeTxt}>
                            Change
                          </p>
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
                              emailState === "Yes" ? styles.green : styles.red
                            }`}>
                            ({emailState === "Yes" ? "Verified" : "Unverified"})
                          </span>
                        </p>
                        <div
                          className={`${styles.row} ${formStyles.form_input}`}>
                          <Field
                            type="email"
                            name="email"
                            value={formik.values.email}
                            placeholder="Enter your email"
                            className={formStyles.contact_input}
                            disabled={sentOtp}
                            onChange={e => {
                              formik.setFieldValue("email", e.target.value);
                              handleEmailChange(e.target.value);
                            }}
                          />
                          {emailState === "No" &&
                            formik.values.email !== "" &&
                            (showOtpInput && countdown > 0 ? (
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
                            {emailState === "No" && (
                              <p
                                onClick={() =>
                                  handleOtpVerification(
                                    formik.values.email,
                                    formik.values.otp,
                                  )
                                }
                                className={styles.changeTxt}>
                                Verify
                              </p>
                            )}
                          </div>
                          {otpError !== "" && (
                            <p className={formStyles.error}>{otpError}</p>
                          )}
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
    </div>
  );
};

export default ProfileSettings;
