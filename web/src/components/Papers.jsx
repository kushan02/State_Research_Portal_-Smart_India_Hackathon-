import React, {Component} from "react";
import NavBar from "./navbar/NavBar.jsx";
import Footer from "./footer/Footer.jsx";
import "./Papers.css";
import constants from "../constants";
import axios from "axios";
import { Tag, Table, Button, Row, Col } from "antd";
import { Card } from "antd";
import { Layout, Menu, Breadcrumb } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

 const columns = [
  {
    title: 'Paper Title',
    dataIndex: 'papers',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
    ],
    onFilter: (value, record) => record.papers.indexOf(value) === 0,
    sorter: (a, b) => a.papers.length - b.papers.length,
    sortDirections: ['descend','ascend'],
  },
  {
    title: 'Citations',
    dataIndex: 'citations',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.citations - b.citations,
  },
  {
    title: 'Year',
    dataIndex: 'year',
    sorter: (a, b) => a.year - b.year,
    sortDirections: ['descend','ascend'],
  },
];

 const data1 = [
  {
    key: '1',
    papers: 'John Brown',
    citations: 32,
    year: 2019,
  },
  {
    key: '2',
    papers: 'Jim Green',
    citations: 42,
    year: 2001,
  },
  {
    key: '3',
    papers: 'Joe Black',
    citations: 32,
    year: 2004,
  },
  {
    key: '4',
    papers: 'Jim Red',
    citations: 32,
    year: 2017,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}
export class Papers extends Component {
  state = {
    data: []

  };


  componentDidMount() {
      axios
      .get(constants.elasticSearchUrl+  constants.elasticSearchAppName +"/_search?q=deep learning")
      .then(res =>{
        console.log(res.data.hits.hits);
        this.setState({ data: res.data.hits.hits });
      })
      .catch(err => console.error(err));
  }



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
                    width:'25%',
              }}>
                  <Card title="Author Details" style={{ width: 260, height:'70vh', borderRadius:'5px' }}>
                       <p>Charotar University of Science and Technology </p>
                       Department of Computer Science and Engineering Anand, India
                            <br/><br/>
                            <p><h4>Current position</h4></p>
Student, Devang Patel Institute of Advance Technology , CSE
                    </Card>
              </div>
            </div>

            <div className="profile-main-outer-div" style={{
                marginTop:'-57px'
            }}>
              <div className="papers-inner-div">
                  <h1>Amit Ganatra<Button size="large" id="contact-button">Contact</Button></h1>
                  Charotar University of Science and Technology | CHARUSAT · Department of Computer Engineering
                  <br/>
                  Doctor of Philosophy
                  <br/><br/>
                  <h3>Skills</h3>
                  <Tag style={{padding:'3px',borderRadius:'7px'}}>Data Analytics</Tag>
                  <Tag style={{padding:'3px',borderRadius:'7px'}}>Bought a wagonr after selling the same.</Tag>
                  <Tag style={{padding:'3px',borderRadius:'7px'}}>Changing questions based on answers.</Tag>


              </div>

          </div>


            <div className="profile-main-outer-div">
              <div className="papers-inner-div">
                      <Row  className="summary-row" justify="space-between">
                            <Col span={8}><h3>101</h3> </Col>
                            <Col span={8}><h3>27,695</h3> </Col>
                            <Col span={8}><h3>772</h3> </Col>
                      </Row>
                      <Row  className="summary-row" justify="space-between">

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

export default Papers;
