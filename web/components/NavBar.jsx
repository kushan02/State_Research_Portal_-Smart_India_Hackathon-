import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "antd";

import "./NavBar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const menu = (
  // <Router>
  <Menu>
    <Menu.Item key="0">
      <Link to="/step-form">
        <a href="http://www.alipay.com/">Upload Paper</a>
      </Link>
    </Menu.Item>
    {/* <Menu.Item key="1">
      <Link to="/login">
        <a href="http://www.taobao.com/">My Profile</a>
      </Link>
    </Menu.Item> */}
    <Menu.Item key="1">
      <Link to="/profile/info">
        <a href="http://www.taobao.com/">Settings</a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link to="/">
        <a href="http://www.taobao.com/">Log Out</a>
      </Link>
    </Menu.Item>
    {/* <Link to="/login">
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Link> */}
  </Menu>
  // </Router>
);

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="nav-bar">
        <Link to="/">
          <div className="nav-bar-logo">
            {/*  document logo*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="35"
              viewBox="0 0 80 80"
              style={{ fill: "#000000" }}
            >
              <path
                fill="#fff"
                d="M12.5 75.5L12.5 4.5 49.793 4.5 67.5 22.207 67.5 75.5z"
              ></path>
              <path
                fill="#788b9c"
                d="M49.586,5L67,22.414V75H13V5H49.586 M50,4H12v72h56V22L50,4L50,4z"
              ></path>
              <path
                fill="#fff"
                d="M49.5 22.5L49.5 4.5 49.793 4.5 67.5 22.207 67.5 22.5z"
              ></path>
              <path
                fill="#788b9c"
                d="M50 5.414L66.586 22H50V5.414M50 4h-1v19h19v-1L50 4 50 4zM24 32H56V33H24zM24 38H48V39H24zM24 44H56V45H24zM24 50H48V51H24zM24 56H56V57H24z"
              ></path>
            </svg>
            <div className="logo-text">Research Portal</div>
          </div>
        </Link>
        <Link to="/registration">
          <span className="nav-sign-up navbar-right-element">
            <span>Create Account</span>
          </span>
        </Link>

        <Link to="/login">
          <span className="nav-sign-in navbar-right-element">Sign In</span>
        </Link>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          className="navbar-right-element"
        >
          <a className="ant-dropdown-link" href="#">
            Fenil Kaneria <Icon type="down" />
          </a>
        </Dropdown>
      </nav>
    );
  }
}

export default NavBar;
