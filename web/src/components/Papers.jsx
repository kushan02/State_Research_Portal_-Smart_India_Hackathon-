import React, { Component } from "react";
import NavBar from "./navbar/NavBar.jsx";
import Footer from "./footer/Footer.jsx";
import "./Papers.css";
import constants from "../constants";
import axios from "axios";
import { Tag, Table, Button, Row, Col } from "antd";
import { Card } from "antd";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const columns = [
  {
    title: "Paper Title",
    dataIndex: "title",
  },
  {
    title: "Citations",
    dataIndex: "citationCount",
  },
  {
    title: "Year",
    dataIndex: "year",
  },
];

function onChange(pagination, filters, sorter, extra) {
  // console.log('params', pagination, filters, sorter, extra);
}
export class Papers extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios
      .get(
        constants.flaskServerUrl +
          "papers/author/id/" +
          localStorage.getItem("user_id")
      )
      .then((res) => {
        // console.log(res.data.map(i=>i._source));
        this.setState({ data: res.data.map((i) => i._source) });
        console.log(
          res.data.map((i) => i._source.citationCount).reduce((x, y) => x + y)
        );
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className="navbar-outer-div">
          <NavBar />
          <br />
        </div>

        <div
          style={{
            paddingTop: "90px",
            width: "80%",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          {/*         <div style={{
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
            </div>*/}

          <div
            className="profile-main-outer-div"
            style={
              {
                // marginTop: '-57px'
              }
            }
          >
            <div className="papers-inner-div-1">
              <div className="papers-inner-left-div">
                <h1>
                  Kushan Mehta
                  {/* <Button size="large" id="contact-button">
                  Contact
                </Button> */}
                </h1>
                Charotar University of Science and Technology | CHARUSAT
                <br />
                BTech - Computer Science & Engineering
                <br />
                <br />
                <h3>Skills</h3>
                <Tag style={{ padding: "3px", borderRadius: "7px" }}>
                  Data Analytics
                </Tag>
                <Tag style={{ padding: "3px", borderRadius: "7px" }}>
                  Machine Learning
                </Tag>
                <Tag style={{ padding: "3px", borderRadius: "7px" }}>
                  Data Mining
                </Tag>
              </div>

              <div className="papers-inner-right-div">
                <Row className="summary-row" justify="space-between">
                  <Col span={12}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        type="file-text"
                        style={{
                          fontSize: "25px",
                          marginRight: "8px",
                          paddingBottom: "5px",
                        }}
                      />
                      <h3>{this.state.data.length}</h3>
                    </div>
                  </Col>
                  {/* <Col span={8}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        type="read"
                        style={{
                          fontSize: "25px",
                          marginRight: "8px",
                          paddingBottom: "5px",
                        }}
                      />
                      <h3>1,276</h3>
                    </div>
                  </Col> */}
                  <Col span={12}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Icon
                        type="bar-chart"
                        style={{
                          fontSize: "25px",
                          marginRight: "8px",
                          paddingBottom: "5px",
                        }}
                      />
                      <h3>
                        {this.state.data.length != 0 &&
                          this.state.data
                            .map((i) => i.citationCount)
                            .reduce((x, y) => x + y)}
                      </h3>
                    </div>
                  </Col>
                </Row>
                <Row className="summary-row" justify="space-between">
                  <Col span={12}>Publications</Col>
                  {/* <Col span={8}>Reads</Col> */}
                  <Col span={12}>Citations</Col>
                </Row>
              </div>
            </div>
          </div>

          {/* <div className="profile-main-outer-div">
            <div className="papers-inner-div"></div>
          </div> */}
          <div className="papers-outer-div">
            <div className="papers-inner-div">
              <h1>Papers</h1>
              <Table columns={columns} dataSource={this.state.data} />
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default Papers;
