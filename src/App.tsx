import React from "react";
import styles from "./myStyles.module.css";

import ResponsiveAppBar from "./components/Nav/Nav";
import BasicCard from "./components/Nav/Card";
import Map from "./components/Map/Map";
import { FooterContainer } from "./Containers/footerContainer";



function App() {
  return (

    <>
      <div className="bg-primary">
        <ResponsiveAppBar />
        <div className="row g-0 bg-transparent ">

          <div className="col bg-transparent d-flex justify-content-center ">
            <div className={styles.leftSide} ><BasicCard /> </div>
          </div>

          <div
            className="col d-flex justify-content-center align-items-center ">
            <div className={styles.rightSide}  >
              <Map />
            </div>

          </div>
        </div>
        <FooterContainer />
      </div>
    </>
  );
}

export default App;
