import { Navigate, NavLink, Outlet } from "react-router-dom";
import "styled-jsx/css";
// import Icon, { BellFilled } from "@ant-design/icons";
import { useAuthStore } from "../store";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
// import { useState } from "react";
import Logo from "../components/icons/Logo";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
// import "./dashboard.css";
// import Home from "../components/icons/Home";
// import UserIcon from "../components/icons/UserIcon";
// import { foodIcon } from "../components/icons/FoodIcon";
// import BasketIcon from "../components/icons/BasketIcon";
// import GiftIcon from "../components/icons/GiftIcon";
// import { useMutation } from "@tanstack/react-query";
// import { logout } from "../http/api";

const { Header, Content } = Layout;

const getMenuItems = (role: string) => {
  const baseItems = [
    {
      key: "/",
      // icon: <Icon component={Home} />,
      label: <NavLink to="/">Partner Admin</NavLink>,
    },

    // {
    //   key: "/",
    //   // icon: <Icon component={foodIcon} />,
    //   label: <NavLink to="/">Dashboard</NavLink>,
    // },
    // {
    //   key: "/orders",
    //   // icon: <Icon component={BasketIcon} />,
    //   label: <NavLink to="/orders">Create Customer</NavLink>,
    // },
    // {
    //   key: "/promos",
    //   // icon: <Icon component={GiftIcon} />,
    //   label: <NavLink to="/promos">Change Plan</NavLink>,
    // },

    // {
    //   key: "/orders",
    //   // icon: <Icon component={BasketIcon} />,
    //   label: <NavLink to="/orders">Payment</NavLink>,
    // },
    // {
    //   key: "/promos",
    //   // icon: <Icon component={GiftIcon} />,
    //   label: <NavLink to="/promos">Recharge</NavLink>,
    // },
  ];

  if (role == "admin") {
    const menus = [...baseItems];
    menus.splice(1, 0, {
      key: "/users",
      // icon: <Icon component={UserIcon} />,
      label: <NavLink to="/users">Users</NavLink>,
    });
    menus.splice(2, 0, {
      key: "/restaurants",
      // icon: <Icon component={foodIcon} />,
      label: <NavLink to="/restaurants">Restaurants</NavLink>,
    });

    return menus;
  }

  return baseItems;
};

const Dashboard = () => {
  // const location = useLocation();
  // const { logout: logoutFromStore } = useAuthStore();

  // const { mutate: logoutMutate } = useMutation({
  //   mutationKey: ["logout"],
  //   mutationFn: logout,
  //   onSuccess: async () => {
  //     logoutFromStore();
  //     return;
  //   },
  // });

  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [drawerVisible, setDrawerVisible] = useState(false);

  // call getself
  const { user } = useAuthStore();

  if (user === null) {
    return (
      <Navigate
        to={`/auth/login?returnTo=${location.pathname}`}
        replace={true}
      />
    );
  }

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };
  const items = getMenuItems("user");

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          // width: "100%",
          height: "75px",
          display: "flex",
          gap: "50px",
          alignItems: "center",
          // padding: "1px 0",
          // alignItems: "flex-between",
          // justifyContent: "space-evenly",
          background: colorPrimary,
        }}
      >
        <div
          className="logo"
          style={{
            marginTop: "23px",
          }}
        >
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{
              color: "#fff",
              fontSize: "18px",
              background: colorPrimary,
            }}
          />
        </div>
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button">
          <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
        </div>

        {/* Mobile Drawer Menu */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={onClose}
          visible={drawerVisible}
          style={{
            color: "#fff",
            fontSize: "18px",
            background: colorPrimary, // Adjust this for your colorPrimary
          }}
        >
          <Menu
            style={{
              color: "#fff",
              fontSize: "18px",
              background: colorPrimary, // Adjust this for your colorPrimary
            }}
            mode="vertical"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Drawer>

        <Space size={16}>
          <Dropdown
            menu={{
              items: [
                {
                  key: "Edit_Profile",
                  label: "Edit Profile",
                  // onClick: () => <Navigate to="auth/login" />,
                },
                {
                  key: "setting",
                  label: "Setting",
                  // onClick: () => <Navigate to="auth/login" />,
                },

                {
                  key: "logout",
                  label: "Logout",
                  onClick: () =>
                    (window.location.href = `/auth/login?returnTo=${location.pathname}`),
                },
              ],
            }}
            placement="bottomRight"
          >
            <Avatar
              src="/src/assets/profile_img.png"
              size={47}
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
            ></Avatar>
          </Dropdown>
        </Space>
      </Header>

      <Content style={{ margin: "24px" }}>
        <Outlet />
      </Content>
      <style jsx>{`
        .desktop-menu {
          width: 100%;
        }

        .mobile-menu-button {
          display: none;
        }

        @media screen and (max-width: 768px) {
          .desktop-menu {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
            width: 100%;
            alignitems: center;
            justify-content: end;
          }
        }
      `}</style>
      {/* <Footer style={{ textAlign: "center" }}></Footer> */}
    </Layout>
  );
};

export default Dashboard;

// import React, { useState } from "react";
// import { Menu, Drawer, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";

// const ResponsiveMenu = () => {
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const items = [
//     // Define your menu items here
//     { label: "Home", key: "1" },
//     { label: "About", key: "2" },
//     { label: "Contact", key: "3" },
//   ];

//   const showDrawer = () => {
//     setDrawerVisible(true);
//   };

//   const onClose = () => {
//     setDrawerVisible(false);
//   };

//   return (
//     <div>
//       {/* Desktop Menu */}
//       <div className="desktop-menu">
//         <Menu
//           mode="horizontal"
//           defaultSelectedKeys={["1"]}
//           items={items}
//           style={{
//             color: "#fff",
//             fontSize: "21px",
//             background: "#001529", // Adjust this for your colorPrimary
//           }}
//         />
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="mobile-menu-button">
//         <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
//       </div>

//       {/* Mobile Drawer Menu */}
//       <Drawer
//         title="Menu"
//         placement="right"
//         onClose={onClose}
//         visible={drawerVisible}
//       >
//         <Menu mode="vertical" defaultSelectedKeys={["1"]} items={items} />
//       </Drawer>

//       <style jsx>{`
//         .desktop-menu {
//           display: flex;
//         }

//         .mobile-menu-button {
//           display: none;
//         }

//         @media screen and (max-width: 768px) {
//           .desktop-menu {
//             display: none;
//           }

//           .mobile-menu-button {
//             display: block;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ResponsiveMenu;

// style={{
//   width: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "end",
// }}
