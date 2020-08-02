import React, {Component} from "react";


import NavBar from "./navbar/NavBar.jsx";
import Footer from "./footer/Footer.jsx";

import "./Papers.css";
import constants from "../constants";

import axios from "axios";
import { Tag, Table, Button } from "antd";


 const columns = [{
    title: 'Quality',
    dataIndex: 'Quality',
  },

  {
    title: 'Citations',
    dataIndex: 'Citations',
    sorter: {
      compare: (a, b) => a.Citations - b.Citations,
      multiple: 2,
    },
  },
  {
    title: 'Year',
    dataIndex: 'Year',
    sorter: {
      compare: (a, b) => a.Year - b.Year,
      multiple: 1,
    },
  },
];
 const data1 = [
  {
    key: '1',
    Quality: 'Car Khareedo Becho',
    Citations: 60,
    Year: 70,
  },
  {
    key: '2',
    Quality: 'Ego - The power within',
    Citations: 66,
    Year: 89,
  },
  {
    key: '3',
    Quality: 'WagonR - Chalti kaa naam WagonR',
    Citations: 90,
    Year: 70,
  },
  {
    key: '4',
    Quality: 'Deep Learning algorithm to change questions automatically.',
    Citations: 99,
    Year: 89,
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


        <div style={{paddingTop:"90px"}}>
            <div className="profile-main-outer-div">
              <div className="papers-inner-div">
                  <h1>Amit Ganatra<Button size="large" id="contact-button">Contact</Button></h1>
                  Charotar University of Science and Technology | CHARUSAT · Department of Computer Engineering
                  <br/>
                  Doctor of Philosophy
                  <br/><br/>
                  <h3>Skills</h3>
                  <Tag>Selling Cars.</Tag>
                  <Tag>Bought a wagonr after selling the same.</Tag>
                  <Tag>Changing questions based on answers.</Tag>
                  <br/><br/>
                  <h3>About</h3>
                  I buy cars. I sell cars. I have lots of ego and lots of data analytics left in me. Wanna piece of me? Come to my office and lets see kisme kitna hai dum.!
              </div>

          </div>



        </div>
        <div className="papers-outer-div">

        <div className="papers-inner-div">

          <h1>Papers</h1>
            <Table columns={columns} dataSource={data1} onChange={onChange} />
        </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Papers;
