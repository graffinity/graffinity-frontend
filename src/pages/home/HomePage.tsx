/* eslint-disable @typescript-eslint/no-unused-vars */
import MultiActionAreaCard from "components/common/Card";
import { FooterContainer } from "components/common/Footer";
import MapComponent from "components/map/MapComponent";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="">
        <div className="">
          <div className="">
            <div className="leftSide">
              <MultiActionAreaCard />
            </div>
          </div>

          <div className="">
            <div className="rightSide">{/* <Map /> */}</div>
          </div>
        </div>
        <MapComponent />
        <FooterContainer />
      </div>
    </div>
  );
};

export default HomePage;
