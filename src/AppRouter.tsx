import "./AppRouter.css";

import Header from "components/common/Header";
import routes from "constants/routes";
import RouteItem from "models/routes/RouteItem";
import { Route, Routes } from "react-router-dom";
import { FooterContainer } from "components/common/Footer";

const AppRouter = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
      <Header />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
        <Routes>
          {[...routes[0].items, ...routes[1].items].map(
            (route: RouteItem) => (
              <Route
                key={route.key}
                path={route.path}
                element={route.element}
              />
            )
          )}
        </Routes>
      </div>
      <FooterContainer />
    </div>
  );
};

export default AppRouter;
