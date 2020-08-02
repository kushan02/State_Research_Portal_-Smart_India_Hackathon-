import React, {Component} from "react";

import ReactDOM from "react-dom";
import {withRouter, Link} from "react-router-dom";
import queryString from "query-string";
import NavBar from "../navbar/NavBar.jsx";
import Footer from "../footer/Footer";

import "./SearchResult.css";
import constants from "../../constants";

import {
  ReactiveBase,
  DataSearch,
  MultiList,
  SelectedFilters,
  ReactiveList,
  DynamicRangeSlider,
  ResultList
} from "@appbaseio/reactivesearch";
import { Row, Button, Col, Card, Switch, Tree, Popover, Affix } from "antd";
import { Skeleton, Icon } from "antd";
import "antd/dist/antd.css";


class SearchResult extends Component {
  state = {
    YOPLower: Number,
    YOPUpper: Number,
    SearchValue: queryString.parse(this.props.location.search).q,
    data: {}
  };
  onSearchValueChange = value => {
    console.log(value);
    this.setState({ SearchValue: value });
  };
  handleShowText = id => {
    document.getElementById(id + "text").style.display = "inline";
    document.getElementById(id + "more-button").style.display = "none";
    document.getElementById(id + "less-button").style.display = "inline";
  };
  handleHideText = id => {
    document.getElementById(id + "text").style.display = "none";
    document.getElementById(id + "more-button").style.display = "inline";
    document.getElementById(id + "less-button").style.display = "none";
  };
  handleKey = (e, triggerQuery) => {
    console.log(e);
    if (e.key === "Enter") {
      // window.history.pushState("object or string", "Page Title", "/search?q="+this.state.SearchValue);
      // console.log("sndbfsd",window.location.href)
      // triggerQuery();
    }
  };
  showFilters = () => {
    // document.getElementById("search-result-filters-id").style.height = "100%";
    document
      .getElementById("search-result-filters-id")
      .classList.add("search-result-filters-open");
    document
      .getElementById("search-result-filters-id")
      .classList.remove("search-result-filters-close");
    document.getElementById("search-result-filters-id").style.marginTop =
      "10px";
    document.getElementById("search-result-filters-id").style.marginBottom =
      "10px";
    document.getElementById("filters-show-button").style.display = "none";
    document.getElementById("filters-hide-button").style.display = "block";
  };
  hideFilters = () => {
    // document.getElementById("search-result-filters-id").style.height = "0px";
    document
      .getElementById("search-result-filters-id")
      .classList.add("search-result-filters-close");
    document
      .getElementById("search-result-filters-id")
      .classList.remove("search-result-filters-open");
    document.getElementById("search-result-filters-id").style.marginTop =
      "20px";
    document.getElementById("search-result-filters-id").style.marginBottom =
      "0px";
    document.getElementById("filters-show-button").style.display = "block";
    document.getElementById("filters-hide-button").style.display = "none";
  };

  render() {
    // console.log(queryString.parse(this.props.location.search));

    return (
      <React.Fragment>
         <div className="navbar-outer-div">
          <NavBar />
        </div>
        <div className="result-filter-outer-div">
          <ReactiveBase
            url={constants.elasticSearchUrl}
            app={constants.elasticSearchAppName}       
          >
            <div className="result-search-bar">
              <Row
                gutter={16}
                // style={{ padding: 20 ,paddingLeft:110,paddingRight:110}}
              >
                <DataSearch
                  componentId="search"
                  onValueChange={this.onSearchValueChange}
                  onKeyDown={this.handleKey}
                  // value={this.state.SearchValue}
                  defaultValue={queryString.parse(this.props.location.search).q}
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
                    "authors.name",
                    "authors.name.autosuggest",
                    "authors.name.english",
                    "authors.name.keyword",
                    "authors.name.search",
                    "doi",
                    "doi.autosuggest",
                    "doi.english",
                    "doi.search",
                    "journalName",
                    "journalName.autosuggest",
                    "journalName.english",
                    "journalName.keyword",
                    "journalName.search",
                    "title",
                    "title.autosuggest",
                    "title.english",
                    "title.search"
                  ]}
                  fieldWeights={[
                    90,
                    90,
                    90,
                    90,
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
                  highlightField={[]}
                  placeholder="Search for research papers"
                  queryFormat="or"
                  style={{
                    marginBottom: 20
                  }}
                  title="Find papers from all field of science"
                />
              </Row>
            </div>
            <Row
              gutter={16}
              // style={{ padding: 100, paddingTop: 20 }}
            >
              <div
                onClick={this.showFilters}
                id="filters-show-button"
                className="filters-show-hide-buttons"
              >
                Filters <Icon type="down" />
              </div>
              <div
                onClick={this.hideFilters}
                id="filters-hide-button"
                className="filters-show-hide-buttons"
              >
                Filters <Icon type="up" />
              </div>
              <div
                className="search-result-filters"
                id="search-result-filters-id"
              >
                <Card>
                  <DynamicRangeSlider
                    loader={
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 1, width: "100%" }}
                      />
                    }
                    // value={2000}
                    componentId="publication-year"
                    dataField="year"
                    title="Year of Publication"
                    defaultValue={(min, max) => ({
                      start: min,
                      end: max
                    })}
                    rangeLabels={(min, max) => ({
                      start: min,
                      end: max
                    })}
                    onValueChange={function(value) {
                      console.log("current value: ", value);
                      document.getElementsByClassName(
                        "css-1e195do e1atnqi30"
                      )[0].innerHTML = value[0];
                      document.getElementsByClassName(
                        "css-hl1uwk e1atnqi30"
                      )[0].innerHTML = value[1];
                      // set the state
                      // use the value with other js code
                    }}
                    stepValue={1}
                    showHistogram={true}
                    showFilter={true}
                    interval={2}
                    react={{
                      and: ["search"]
                    }}
                    URLParams={true}
                    // loader="Loading ..."
                  />
                </Card>
                <Card>
                  <MultiList
                    loader={
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 1, width: "100%" }}
                      />
                    }
                    componentId="journals"
                    dataField="journalName.keyword"
                    size={100}
                    style={{
                      marginBottom: 20
                    }}
                    title="Journals"
                    react={{
                      and: ["search"]
                    }}
                  />
                </Card>
                <Card>
                  <MultiList
                    loader={
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 1, width: "100%" }}
                      />
                    }
                    componentId="authors"
                    dataField="authors.name.keyword"
                    // size={"999"}
                    // sortBy ="asc"
                    // showLoadMore ="true"
                    style={{
                      marginBottom: 20
                    }}
                    title="Authors"
                    react={{
                      and: ["search"]
                    }}
                  />
                </Card>
              </div>
              <div className="search-result-results">
                <SelectedFilters />
                <div id="result">
                  <ReactiveList
                    //       sortOptions={[
                    //         {
                    //             label: "Citation",
                    //             sort: { order: "desc", dataField: "citationCount" },
                    //         },
                    //         {
                    //             label: "Date",
                    //             sort: [
                    //                 { order: "desc", dataField: "year" },
                    //                 { order: "desc", dataField: "citationCount" },
                    //             ],
                    //         },
                    // ]}
                    // ]}
                    sortOptions={[
                      // {
                      //   label: "Best Match",
                      //   dataField: "_score",
                      //   sortBy: "desc"
                      // },
                      {
                        label: "Best Match",
                        dataField: "_score",
                        sortBy: "desc"
                      },
                      {
                        label: "Citations",
                        dataField: "citationCount",
                        sortBy: "desc"
                      },

                      {
                        label: "Year Descending ",
                        dataField: "year",
                        sortBy: "desc"
                      },
                      {
                        label: "Year Ascending ",
                        dataField: "year",
                        sortBy: "asc"
                      }
                    ]}
                    loader={
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 3, width: "100%" }}
                      />
                    }
                    componentId="result"
                    dataField="citationCount"
                    pagination={true}
                    react={{
                      and: ["publication-year", "authors", "journals", "search"]
                    }}
                    // renderItem={renderItem}
                    render={({ data }) => (
                      <ReactiveList.ResultListWrapper>
                        {data.map(item => (
                          <div
                            className="search-result-outer-div"
                            key={item.id}
                          >
                            <ResultList key={item._id}>
                              {console.log(item)}
                              <div className="search-result">
                                <div className="search-result-title">
                                  <a href={"/paper-details/" + item._id}>
                                    {item.title}
                                  </a>
                                </div>
                                <div>
                                  {item.authors.map(author => (
                                    <span
                                      className="search-result-author"
                                      key={author.name}
                                    >
                                      {author.name + ""}
                                    </span>
                                  ))}
                                  {" . "}
                                  <span className="search-result-date">
                                    {item.year}
                                  </span>
                                  <div className="search-result-journal-name">
                                    {item.journalName}
                                  </div>
                                </div>
                                <div className="search-result-abstract">
                                  <span>
                                    {item.paperAbstract.slice(0, 300)}
                                  </span>

                                  <span
                                    id={item.id + "text"}
                                    className="details-text-hidden"
                                  >
                                    {item.paperAbstract.slice(300, -1)}
                                  </span>
                                  <span
                                    id={item.id + "less-button"}
                                    className="display-none"
                                    onClick={() => {
                                      // console.log("F")
                                      this.handleHideText(item.id);
                                    }}
                                  >
                                    {" "}
                                    ...
                                    <span className="details-abstract-more">
                                      (less)
                                    </span>
                                  </span>

                                  {item.paperAbstract.length > 300 ? (
                                    <span
                                      id={item.id + "more-button"}
                                      onClick={() => {
                                        // console.log("F")
                                        this.handleShowText(item.id);
                                      }}
                                    >
                                      {" "}
                                      ...
                                      <span className="details-abstract-more">
                                        (more)
                                      </span>
                                    </span>
                                  ) : (
                                    <span></span>
                                  )}
                                  {/* {item.paperAbstract.slice !=
                              item.paperAbstract.slice(0, 400)
                                ? "..."
                                : ""} */}
                                </div>
                                <span className="search-result-citation">
                                  <Icon
                                    type="bar-chart"
                                    style={{ marginRight: "5px" }}
                                  />
                                  {/* <svg
                                    className="search-result-citation-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    style={{}}
                                  >
                                    <g id="_42.graph" data-name="42.graph">
                                      <path
                                        className="cls-1"
                                        d="M1,1V21a1.959,1.959,0,0,0,2,2H23"
                                      />
                                      <path
                                        className="cls-1"
                                        d="M5,23V13a1,1,0,0,1,1-1H9a1,1,0,0,1,1,1V23"
                                      />
                                      <path
                                        className="cls-1"
                                        d="M10,13V3a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1V13"
                                      />
                                      <path
                                        className="cls-1"
                                        d="M15,23V9a1,1,0,0,1,1-1h3a1,1,0,0,1,1,1V23"
                                      />
                                    </g>
                                  </svg> */}
                                  <span className="search-result-citation-count">
                                    {item.citationCount}
                                  </span>

                                  {/* <span>{item.vote_count}</span> */}
                                </span>

                                {item.pdfUrls &&
                                (item.pdfUrls.length > 0 ||
                                  item.s2PdfUrl.length != 0) ? (
                                  <React.Fragment>
                                    <span className="search-result-pdf-link">
                                      <a
                                        href={
                                          item.pdfUrls.length > 0
                                            ? item.pdfUrls[0]
                                            : item.s2PdfUrl
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Icon type="file-pdf" />
                                        {/* <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          x="0px"
                                          y="0px"
                                          width="14"
                                          // height="14"
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
                                        </svg> */}
                                        <span className="search-result-pdf-link-text">
                                          View PDF
                                        </span>
                                      </a>
                                    </span>
                                  </React.Fragment>
                                ) : (
                                  <span></span>
                                )}
                              </div>
                            </ResultList>
                          </div>
                        ))}
                      </ReactiveList.ResultListWrapper>
                    )}
                    size={10}
                    style={{
                      marginTop: 20
                    }}
                  />
                </div>
              </div>
            </Row>
          </ReactiveBase>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}
export default withRouter(SearchResult);
