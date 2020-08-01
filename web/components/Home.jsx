import React, { Component } from "react";

import "./Home.css";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import { Input } from "antd";
import { useHistory } from "react-router-dom";


import {
  ReactiveBase,
  DataSearch,
  MultiList,
  SelectedFilters,
  ReactiveList,
  DynamicRangeSlider,
  ResultList
} from "@appbaseio/reactivesearch";

import background from '../assets/background.jpg'

import { withRouter } from "react-router-dom";
const { Search } = Input;

// const background = require('../assets/background.jpg');

class Home extends Component {
  state = {
    SearchValue: ""
  };
  // onSubmit = value => {
  //   this.props.history.push("/search?q=" + value);
  // };
  onSearchValueChange = value => {
    this.setState({ SearchValue: value });
    // console.log(value);
    // console.log(this.props.SearchValue)
  };
  handleKey = (e, triggerQuery) => {
    console.log(e)
    if (e.key === "Enter") {
            this.props.history.push("/search?q=" + this.state.SearchValue);

    }
  };

  render() {
    return (
      <React.Fragment>
        <div style={{position:"absolute",width:"100%"}}>

        <NavBar />
        </div>
        <div className="home-center-element"  >
          <div className="center-container">
            <h1>Research Papers</h1>
            <h2>
              Find research from the world's most trusted sources
            </h2>
            <div className="search-bar">
              <ReactiveBase
                app="research-portal"
                credentials="GqA01As7V:c544b036-d3a0-4725-acd5-4d1b31b7b5cc"
                url="https://scalr.api.appbase.io"
                analytics={true}
                searchStateHeader
              >
                <DataSearch
                  onValueChange={this.onSearchValueChange}
                  onKeyDown={this.handleKey}
                  componentId="search"
                  // dataField={[
                  //   "authors.name",
                  //   "authors.name.autosuggest",
                  //   "authors.name.english",
                  //   "authors.name.keyword",
                  //   "authors.name.search",
                  //   "doi",
                  //   "doi.autosuggest",
                  //   "doi.english",
                  //   "doi.search",
                  //   "journalName",
                  //   "journalName.autosuggest",
                  //   "journalName.english",
                  //   "journalName.keyword",
                  //   "journalName.search",
                  //   "paperAbstract",
                  //   "paperAbstract.autosuggest",
                  //   "paperAbstract.english",
                  //   "paperAbstract.search",
                  //   "venue",
                  //   "venue.autosuggest",
                  //   "venue.english",
                  //   "venue.keyword",
                  //   "venue.search",
                  //   "title",
                  //   "title.autosuggest",
                  //   "title.english",
                  //   "title.search"
                  // ]}
                  // fieldWeights={[
                  //   10,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   10,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   1,
                  //   50,
                  //   1,
                  //   1,
                  //   1
                  // ]}
                  // fuzziness={1}
                  // highlight={true}
                  // highlightField={[
                  //   "authors.name",
                  //   "doi",
                  //   "journalName",
                  //   "paperAbstract",
                  //   "venue",
                  //   "title"
                  // ]}
                  dataField={[
                    'authors.name',
                    'authors.name.autosuggest',
                    'authors.name.english',
                    'authors.name.keyword',
                    'authors.name.search',
                    'doi',
                    'doi.autosuggest',
                    'doi.english',
                    'doi.search',
                    'journalName',
                    'journalName.autosuggest',
                    'journalName.english',
                    'journalName.keyword',
                    'journalName.search',
                    'title',
                    'title.autosuggest',
                    'title.english',
                    'title.search'
                  ]}
                  fieldWeights={[
                    30,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    10,
                    1,
                    1,
                    1,
                    1,
                    50,
                    1,
                    1,
                    1
                  ]}
                  fuzziness={1}
                  highlight={false}
                  highlightField={[
                  ]}
                  placeholder="Search for research papers"
                  queryFormat="or"
                  style={{
                    marginBottom: 20
                  }}
                  // title="Find papers from all field of science"
                />
              </ReactiveBase>
              {/* <Search
                placeholder="input search text"
                onSearch={value => {
                  console.log(value);
                  this.onSubmit(value);
                }}
                enterButton
                size="large"
              /> */}
            </div>
          </div>
        </div>
        <div className="home-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Home);
