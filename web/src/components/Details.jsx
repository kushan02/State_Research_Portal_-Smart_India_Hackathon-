import React, { Component } from "react";
import "./Details.css";
// import queryString from "query-string";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

import { Skeleton, Icon } from "antd";
import constants from "../constants";

import axios from "axios";

export class Details extends Component {
  state = {
    data: {},
    loading: true,
  };

  componentDidMount() {
    axios
      .get(
        constants.flaskServerUrl +
          "paper_details?id=" +
          this.props.match.params.id
      )
      .then((res) => {
        console.log(res.data.hits.hits[0]._source);
        this.setState({ data: res.data.hits.hits[0]._source });
        this.setState({ loading: false });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className="navbar-outer-div">
          <NavBar />
        </div>
        <div className="details-outer-div">
          <div className="details-left-div">
            <div className="details-left-inner-div">
              {this.state.loading ? (
                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 3, width: "100%" }}
                />
              ) : (
                <React.Fragment>
                  <h1>{this.state.data.title}</h1>
                  <span className="reference-info">
                    {this.state.data.venue}
                  </span>
                  <div className="details-page-date-description">
                    {/* <span>7 Pages -</span> */}
                    <span> Date Written: {this.state.data.year}</span>
                    <div
                      className="mobile-view-element"
                      style={{ marginTop: "10px" }}
                    >
                      <Icon
                        type="bar-chart"
                        className="paper-details-citation-icon"
                      />
                      Citations : {this.state.data.citationCount}
                      <div style={{ marginTop: "10px" }}>
                        <Icon
                          type="link"
                          className="paper-details-citation-icon"
                        />
                        References :{this.state.data.referenceCount}
                      </div>
                    </div>
                  </div>
                  <div>
                    {this.state.data.authors &&
                      this.state.data.authors.map((author) => (
                        <span
                          className="search-result-author"
                          key={author.name}
                        >
                          {author.name + ""}
                        </span>
                      ))}
                  </div>
                  <h2>Abstract</h2>
                  <p className="details-abstract">
                    {this.state.data.paperAbstract}
                  </p>
                  {this.state.data.pdfUrls &&
                  (this.state.data.pdfUrls.length > 0 ||
                    this.state.data.s2PdfUrl.length != 0) ? (
                    <a
                      href={
                        this.state.data.pdfUrls.length > 0
                          ? this.state.data.pdfUrls[0]
                          : this.state.data.s2PdfUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="mobile-view-element"
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          border: "1px solid rgb(212, 212, 212)",
                          padding: "10px",
                        }}
                      >
                        <Icon
                          type="file-pdf"
                          style={{
                            color: "#1890ff",
                            fontSize: "17px",
                            marginRight: "5px",
                          }}
                        />
                        <span>View PDF</span>
                      </div>
                    </a>
                  ) : (
                    <span></span>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="details-right-div">
            <div className="details-right-paper-statistics">
              {this.state.loading ? (
                <Skeleton
                  active
                  title={false}
                  paragraph={{ rows: 1, width: "100%" }}
                />
              ) : (
                <React.Fragment>
                  <h2> Paper Statistics</h2>
                  CITATIONS
                  <div>
                    <Icon
                      type="bar-chart"
                      className="paper-details-citation-icon"
                    />
                    <span className="paper-details-citation-count">
                      {this.state.data.citationCount}
                    </span>
                  </div>
                  <div style={{ marginTop: "10px" }}></div>
                  {/* references */}
                  REFERENCES
                  <div>
                    <Icon type="link" className="paper-details-citation-icon" />
                    <span className="paper-details-citation-count">
                      {this.state.data.referenceCount}
                    </span>
                  </div>
                </React.Fragment>
              )}
            </div>
            {this.state.data.pdfUrls &&
            (this.state.data.pdfUrls.length > 0 ||
              this.state.data.s2PdfUrl.length != 0) ? (
              <a
                href={
                  this.state.data.pdfUrls.length > 0
                    ? this.state.data.pdfUrls[0]
                    : this.state.data.s2PdfUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="details-open-pdf">
                  <Icon type="file-pdf" />
                  <span className="details-open-pdf-text">View PDF</span>
                </div>
              </a>
            ) : (
              <span></span>
            )}
          </div>
          <div style={{ clear: "both" }}></div>
          {/* <div className="details-references">
            <h1>13 References </h1>
            <ol>
              <li>
                <div>
                  H Chen, S S Tsai, G Schroth, D M Chen, R Grzeszczuk, B Girod
                </div>
                <div>
                  Robust text detection in natural images with edge-enhanced
                  Maximally Stable Extremal Regions
                </div>
                <div>
                  18th IEEE International Conference on Image Processing, p. 234
                  - 239
                </div>
                <div>Posted: 2011</div>
              </li>
            </ol>
          </div> */}
        </div>
        <div style={{ clear: "both" }}></div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default Details;
