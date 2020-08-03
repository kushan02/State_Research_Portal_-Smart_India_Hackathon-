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
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

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
    authorData: {},
    paperLoading: false,
  };
  loadData = () => {
    this.setState({ loading: true });
    axios
      .post(constants.flaskServerUrl + "account/details", {
        user_email: localStorage.getItem("user_email") || "",
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ authorData: res.data });
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  componentDidMount() {
    this.loadData();
    this.setState({ paperLoading: true });

    axios
      .get(
        constants.flaskServerUrl +
          "papers/author/id/" +
          localStorage.getItem("user_id")
      )
      .then((res) => {
        this.setState({ paperLoading: false });
        // console.log(res.data.map(i=>i._source));
        this.setState({ data: res.data.map((i) => i._source) });
        // console.log(
        //   res.data.map((i) => i._source.citationCount).reduce((x, y) => x + y)
        // );
      })
      .catch((err) => {
        this.setState({ paperLoading: false });

        console.error(err);
      });
  }

  render() {
    let interestArr = IsJsonString(this.state.authorData.user_interests)
      ? JSON.parse(this.state.authorData.user_interests).interests
      : [];
    console.log(interestArr);
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
                  {localStorage.getItem("user_name")}
                  {/* <Button size="large" id="contact-button">
                  Contact
                </Button> */}
                </h1>
                {/* Charotar University of Science and Technology | CHARUSAT */}
                {localStorage.getItem("user_institute")}

                <br />
                <br />
                {/* BTech - Computer Science & Engineering */}
              
                {interestArr.length != 0 && <h3>Interests</h3>}

                {interestArr.length != 0 &&
                  interestArr.map((i) => {
                    return (
                      <Tag style={{ padding: "3px", borderRadius: "7px" }}>
                        {i}
                      </Tag>
                    );
                  })}
                {/* <Tag style={{ padding: "3px", borderRadius: "7px" }}>
                  Data Analytics
                </Tag>
                <Tag style={{ padding: "3px", borderRadius: "7px" }}>
                  Machine Learning
                </Tag>
                <Tag style={{ padding: "3px", borderRadius: "7px" }}>
                  Data Mining
                </Tag> */}
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
                        {this.state.data.length == 0
                          ? "0"
                          : this.state.data
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
              <Table
                columns={columns}
                dataSource={this.state.data}
                loading={this.state.paperLoading}
              />
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default Papers;
