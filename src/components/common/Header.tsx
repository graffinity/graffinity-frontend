import { ThemeProvider } from "@emotion/react";
import BrushIcon from "@mui/icons-material/Brush";
import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./Common.css";
import SwipeableEdgeDrawer from "./Drawer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#202024",
    },
  },
});

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          display: { md: "block", xs: "none" },
          borderRadius: "0 0 20px 20px",
        }}
      >
        <Toolbar
          disableGutters
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
          sx={{
            padding: "0px 32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <BrushIcon
              sx={{
                display: {
                  xs: "block",
                  md: "flex",
                  fontSize: "large",
                },
              }}
              style={{
                paddingRight: "8px",
              }}
            />
            <Typography
              variant="h3"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "Times, Times New Roman, serif",
                fontWeight: 300,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GRAFFINITY
            </Typography>
            <Typography
              textAlign="center"
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Times, Times New Roman, serif",
                fontWeight: 200,
                fontSize: 20,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GRAFFINITY
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                disableScrollLock
                sx={{
                  mt: "45px",
                  display: { xs: "none", md: "block" },
                }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      {/* appbar for mobile device  */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", md: "none" },
          top: "auto",
          bottom: 0,
          mt: "none",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <Toolbar
          disableGutters
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
          sx={{
            padding: "0px 32px",
          }}
        >
          {/* menu icon button  */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              background: "transparent",
            }}
          >
            <SwipeableEdgeDrawer />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <BrushIcon
              sx={{
                display: {
                  xs: "block",
                  md: "flex",
                  fontSize: "large",
                },
              }}
              style={{
                paddingRight: "8px",
              }}
            />

            <Typography
              textAlign="center"
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Times, Times New Roman, serif",
                fontWeight: 200,
                fontSize: 20,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GRAFFINITY
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ display: { xs: "block", md: "none" } }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
