import { Link, List } from "@mui/material";
import routes from "constants/routes";

const NavBar = () => {
  return (
    <List
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "12px",
      }}
    >
      {[...routes[0].items, ...routes[1].items].map((item) => (
        <Link key={item.key} href={item.path}>
          {item.pageTitle}
        </Link>
      ))}
    </List>
  );
};

export default NavBar;
