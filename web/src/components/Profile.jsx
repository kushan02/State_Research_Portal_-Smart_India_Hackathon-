import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./Profile.css";

import ProfileComponents from "./ProfileComponents";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

 render() {
    return (
      <React.Fragment>
        <div className="navbar-outer-div">
          <NavBar />
          <br/>

        </div>




        <div style={{paddingTop:"90px", width:'80%'}}>
            <div style={{
                marginLeft:'98%',
                width:'25%',
                height:'57px'
            }}>
                <div style={{
                    width: '25%',
                }}>
                    <Card title="Author Details" style={{width: 260, height: '70vh', borderRadius: '5px'}}>
                        <p>Charotar University of Science and Technology </p>
                        Department of Computer Science and Engineering, Gujarat, India
                        <br/><br/>
                        <p><h4>Current position</h4></p>
                        Student, Devang Patel Institute of Advance Technology , CSE
                    </Card>
                </div>
            </div>

            <div className="profile-main-outer-div" style={{
                marginTop: '-57px'
            }}>
                <div className="papers-inner-div">
                    <h1>Kushan Mehta<Button size="large" id="contact-button">Contact</Button></h1>
                    Charotar University of Science and Technology | CHARUSAT
                    <br/>
                    BTech - Computer Science & Engineering
                    <br/><br/>
                    <h3>Skills</h3>
                    <Tag style={{padding: '3px', borderRadius: '7px'}}>Data Analytics</Tag>
                    <Tag style={{padding: '3px', borderRadius: '7px'}}>Machine Learning</Tag>
                    <Tag style={{padding: '3px', borderRadius: '7px'}}>Data Mining</Tag>


                </div>

            </div>


            <div className="profile-main-outer-div">
              <div className="papers-inner-div">
                  <Row className="summary-row" justify="space-between">
                      <Col span={8}><h3>1</h3></Col>
                      <Col span={8}><h3>1,276</h3></Col>
                      <Col span={8}><h3>7</h3></Col>
                  </Row>
                  <Row className="summary-row" justify="space-between">

                      <Col span={8}>Publications</Col>
                      <Col span={8}>Reads</Col>
                      <Col span={8}>Citations</Col>
                  </Row>
              </div>
          </div>
        <div className="papers-outer-div">

        <div className="papers-inner-div">


          <h1>Papers</h1>
          	     <Table columns={columns} dataSource={data1} onChange={onChange} />
        </div>
        </div>

        </div>



          <Footer/>
      </React.Fragment>
    );
  }
}

export default Sider;
