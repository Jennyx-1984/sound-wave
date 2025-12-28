import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../css/mainlayout.module.css";
import React from "react";

function MainLayout() {
  return (
    <div className={styles.structure} data-testid="main-structure">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;