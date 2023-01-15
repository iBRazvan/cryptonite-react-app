import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const items = [
    { label: <Link to="/"> Home </Link>, key: "homelabel" },
    {
      label: <Link to="/cryptocurrencies"> Cryptocurrencies </Link>,
      key: "cryptocurrencieslabel",
    },
    {
      label: <Link to="/exchanges"> Exchanges </Link>,
      key: "exchangeslabel",
    },
    { label: <Link to="/news"> News </Link>, key: "newslabel" },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/"> CryptoNite</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined className="menu-outlined" />
        </Button>
      </div>
      {activeMenu && <Menu theme="dark" items={items} key={items} />}
    </div>
  );
};

export default Navbar;
