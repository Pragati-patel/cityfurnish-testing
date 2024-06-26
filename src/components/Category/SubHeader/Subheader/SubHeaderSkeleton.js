import {Skeleton} from "@mui/material";
import React from "react";
import styles from "./subHeaderSkeleton.module.css";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";
import {FaqsSkeleton} from "@/components/Common/FrequentlyAskedQuestions";
import {ContentSkeleton} from "@/components/Common/ContentSkeleton";

export default function SubHeaderSkeleton() {
  return (
    <>
      <div className={styles.main_containor}>
        <Skeleton variant="text" className={`w-[30%]`} />
        <Skeleton variant="text" height={15} className={`w-[80%] mt-8 my-4`} />
        <div className={styles.Skeleton_row}>
          {[1, 2, 3, 4]?.map((item, index) => (
            <div className="h-[120px] flex mr-4" key={index.toString()}>
              <Skeleton
                variant="rectangular"
                height={120}
                className={`w-[170px] flex `}
              />
            </div>
          ))}
        </div>
        <div className={styles.filtr_skeleton_row}>
          <div className="h-6 ">
            <Skeleton variant="rectangular" width={150} height={50} />
          </div>
          <div>
            <Skeleton variant="rectangular" width={150} height={50} />
          </div>
        </div>
        <div className={styles.line_skeleton}></div>
        <div className={styles.card_wrraper}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, index) => (
            <div className={styles.div} key={index.toString()}>
              <Skeleton variant="rectangular" width={"100%"} height={300} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-24">
        <ProductRowSkeleton />
        <FaqsSkeleton />
        <ContentSkeleton />
      </div>
    </>
  );
}
