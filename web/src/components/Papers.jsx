import React, {Component} from "react";
import NavBar from "./navbar/NavBar.jsx";
import Footer from "./footer/Footer.jsx";
import "./Papers.css";
import {Layout, Menu, Breadcrumb} from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;




  render() {
    return (
      <React.Fragment>
        <div className="navbar-outer-div">
          <NavBar />
          <br/>

        </div>


          <Footer/>
      </React.Fragment>
    );
  }
}

export default Papers;
