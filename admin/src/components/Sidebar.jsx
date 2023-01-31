import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
    Collapse,
} from '@mui/material';

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  Inbox,
  Drafts,
  Send,
  ExpandLess,
  ExpandMore,
  ShoppingCart,
} from "@mui/icons-material";

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from "../assets/profile.jpg";

const navItems = [
  {
    text: "Tableau de bord",
    icon: <HomeOutlined />,
    pathname: "tableau-de-bord",
  },
  {
    text: "Espace client",
    icon: null,
    pathname: null,
  },
  {
    text: "Articles",
    icon: <ShoppingCartOutlined />,
    pathname: "articles",
  },
  {
    text: "Clients",
    icon: <Groups2Outlined />,
    pathname: "clients",
  },
  {
    text: "Paiements",
    icon: <ReceiptLongOutlined />,
    pathname: "paiements",
  },
  // {
  //   text: "Ventes",
  //   icon: null,
  //   pathname: null,
  // },
  // {
  //   text: "Vue d'ensemble",
  //   icon: <PointOfSaleOutlined />,
  //   pathname: "vue-d-ensemble",
  // },
  // {
  //   text: "Quotidiennes",
  //   icon: <TodayOutlined />,
  //   pathname: "journalier",
  // },
  // {
  //   text: "Mensuel",
  //   icon: <CalendarMonthOutlined />,
  // },
  // {
  //   text: "Breakdown",
  //   icon: <PieChartOutlined />,
  // },
  // {
  //   text: "Management",
  //   icon: null,
  // },
  // {
  //   text: "Admin",
  //   icon: <AdminPanelSettingsOutlined />,
  // },
  // {
  //   text: "Performance",
  //   icon: <TrendingUpOutlined />,
  // },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h5" fontWeight="bold">
                    L'AGREABLE UTILE
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, pathname, collapse, children }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return !collapse ? (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${pathname}`);
                        setActive(pathname);
                      }}
                      sx={{
                        backgroundColor:
                          active === pathname
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === pathname
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === pathname
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <List key={text} disablePadding>
                    <ListItemButton
                      onClick={handleClick}
                      sx={{
                        backgroundColor:
                          active === pathname
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === pathname
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === pathname
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <ShoppingCart />
                      </ListItemIcon>
                      <ListItemText primary="Articles" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={open}
                      timeout="auto"
                      unmountOnExit
                      sx={{ color: theme.palette.neutral[300] }}
                    >
                      {children.map(({ text, pathname }) => (
                        <List
                          component="div"
                          disablePadding
                          onClick={() => {
                            navigate(`/${pathname}`);
                            setActive(text);
                          }}
                          sx={{
                            backgroundColor:
                              active === pathname
                                ? theme.palette.secondary[300]
                                : "transparent",
                            color:
                              active === pathname
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[100],
                          }}
                        >
                          <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon
                              sx={{
                                ml: "1rem",
                                color:
                                  active === pathname
                                    ? theme.palette.primary[600]
                                    : theme.palette.secondary[200],
                              }}
                            ></ListItemIcon>
                            <ListItemText primary={text} />
                          </ListItemButton>
                        </List>
                      ))}
                    </Collapse>
                  </List>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=CCA752&color=fff&rounded=true&size=95&font-size=0.33`}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  {user.firstname}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{
                    color: theme.palette.secondary[200],
                  }}
                >
                  {"Admin"}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
