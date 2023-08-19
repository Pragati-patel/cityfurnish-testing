import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import Image from "next/image";
import {FooterIcons} from "@/assets/icon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const text = `© Copyright ${currentYear} Cityfurnish. All Rights Reserved.`;
  const str = string.common_components.Footer;

  return (
    <div className={styles.footer_wrapper}>
      {/* <h2 className={styles.head}>{str.why_furni}</h2>
      <p className={styles.desc}>{str.why_furni_desc}</p> */}

      <div className={styles.pointers_div}>
        {str.array.map((item, index) => (
          <div key={index.toString()} className={styles.head_wrapper}>
            <h2 className={`!text-[#222] ${styles.head}`}>{item.head}</h2>
            <div className={styles.points_div}>
              {item.points.map((t, i) => (
                <p
                  key={i.toString()}
                  className={styles.points}
                  onClick={() => console.log("clicked")}>
                  {t?.text}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.need_help_box}>
          <h2 className={`!text-[#222] ${styles.head}`}>Need Help</h2>
          <div className={styles.contact_div}>
            <Image
              className={styles.phoneImg}
              alt="phone-icon"
              src={FooterIcons.Phone}
            />
            <div>
              <p className={styles.contact}>{str.contact}</p>
              <p className={styles.time}>{str.time}</p>
            </div>
          </div>
          <div className={styles.social_media_icons_div}>
            {FooterIcons.social_media_icons.map((item, index) => (
              <img
                key={index.toString()}
                alt={item?.icon}
                src={item?.icon}
                // className={styles.sm_icon}
                onClick={() => console.log("cliked")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.line}></div>

      <div className="xl:hidden">
        <div className={styles.contact_div}>
          <Image
            className={styles.phoneImg}
            alt="phone-icon"
            src={FooterIcons.Phone}
          />
          <div>
            <p className={styles.contact}>{str.contact}</p>
            <p className={styles.time}>{str.time}</p>
          </div>
        </div>

        <div className={styles.social_media_icons_div}>
          {FooterIcons?.social_media_icons?.map((item, index) => (
            <img
              key={index.toString()}
              alt={item?.icon}
              src={item?.icon}
              // className={styles.sm_icon}
              onClick={() => console.log("cliked")}
            />
          ))}
        </div>
      </div>

      <div className={styles.copyRight_div}>
        <p className={styles.copyTxt}>{text}</p>
        <div
          className={styles.goToTopDiv}
          onClick={() =>
            window.scrollTo({top: 0, left: 0, behavior: "smooth"})
          }>
          <Image
            src={FooterIcons.GoToTopIcon}
            alt="go-to-top-icon"
            className={styles.goToTopIcon}
          />
          <p className={styles.goToTopTxt}>{str.go_to_top}</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
