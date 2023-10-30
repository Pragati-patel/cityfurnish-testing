"use client";
import React from "react";
import Header from "../../components/Common/Header";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
import DocMain from "@/components/Documentation/DocMain/DocMain";
import Notifications from "@/components/Common/Notifications/Notification";

const Documentaion = () => {
  return (
    <div>
      <AnnouncementBar />
      <Header />
      <DocMain />
      <Notifications />
    </div>
  );
};

export default Documentaion;
