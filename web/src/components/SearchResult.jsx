import React, { Component } from "react";

import "./SearchResult.css";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer";

import {
  ReactiveBase,
  CategorySearch,
  SingleRange,
  ResultCard,
  ReactiveList,
  ResultList
} from "@appbaseio/reactivesearch";

class SearchResult extends Component {
  state = {};
  render() {
    console.log(queryString.parse(this.props.location.search));
    return (
      <div>
        <NavBar />
        <ReactiveBase
          app="MovieAppFinal"
          credentials="RxIAbH9Jc:6d3a5016-5e9d-448f-bd2b-63c80b401484"
        >
          <div
          //   style={{ width: "30%", float: "left" }}
          >
            <CategorySearch
              style={{ margin: "50px" }}
              componentId="searchbox"
              dataField="model"
              categoryField="brand.keyword"
              placeholder="Search for cars"
            />
          </div>
          <div
          //   style={{ width: "50%", float: "left" }}
          >
              <div className="search-result-list">
            <ReactiveList
              componentId="queryResult"
              title="Results"
              dataField="model"
              from={0}
              size={5}
              pagination={true}
              react={{
                and: ["searchbox", "ratingsfilter"]
              }}
              render={({ data }) => (
                <ReactiveList.ResultListWrapper>
                  {data.map(item => (
                      <div className="search-result-outer-div">
                    <ResultList key={item._id}>
                      {console.log(item)}
                      <div className="search-result">
                        <div className="search-result-title"><a  ="">{item.original_title}</a></div>
                        <div>
                          <span className="search-result-author">{item._type}</span>
                          {" - "}
                          <span className="search-result-date">{item.release_date}</span>
                        </div>
                        <div className="search-result-abstract">{item.overview}</div>
                        <div className="search-result-citation">
                          <svg
                          className="search-result-citation-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            style={{
                         
                            }}
                          >
                            {/* <style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style> */}
                            {/* <title>42.graph</title> */}
                            <g id="_42.graph" data-name="42.graph">
                              <path
                                class="cls-1"
                                d="M1,1V21a1.959,1.959,0,0,0,2,2H23"
                              />
                              <path
                                class="cls-1"
                                d="M5,23V13a1,1,0,0,1,1-1H9a1,1,0,0,1,1,1V23"
                              />
                              <path
                                class="cls-1"
                                d="M10,13V3a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1V13"
                              />
                              <path
                                class="cls-1"
                                d="M15,23V9a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1V23"
                              />
                            </g>
                          </svg>
                          <span className="search-result-citation-count">{item.vote_count}</span>
                          {/* <span>{item.vote_count}</span> */}
                        </div>
                      </div>
                    </ResultList>
                    </div>))}
                </ReactiveList.ResultListWrapper>
              )}
            /></div>
          </div>
        </ReactiveBase>
        <Footer />

      </div>
    );
  }
}

export default withRouter(SearchResult);
