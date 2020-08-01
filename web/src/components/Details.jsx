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
    data: {}
  };

  componentDidMount() {
    // fetch(
    //     // constants.elasticSearchUrl + constants.elasticSearchAppName + "/_search?q=id:" +
    //     constants.flaskServerUrl + "paper_details?id=" + this.props.match.params.id
    // )
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(myJson => {
    //         console.log(myJson.hits.hits[0]._source);
    //         this.setState({data: myJson.hits.hits[0]._source});
    //     })
    //     .catch(function (err) {
    //         console.log("Fetch Error :-S", err);
    //     });
    axios
      .get(
        constants.flaskServerUrl +
          "paper_details?id=" +
          this.props.match.params.id
      )
      .then(res =>{
         console.log(res)
         this.setState({data: res.data.hits.hits[0]._source});
      })
      .catch(err => console.error(err));
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
              <h1>
                {this.state.data.title}
                {/* Text Extraction from Book Cover Using MSER{" "} */}
                {/* {JSON.stringify(this.props.match.params)} */}
              </h1>
              <span className="reference-info">
                {/* Proceedings of International Conference on Sustainable Computing
                in Science, Technology and Management (SUSCOM), Amity University
                Rajasthan, Jaipur - India, February 26-28, 2019 */}
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
                  Citations :{" "}
                  {this.state.data.inCitations &&
                    this.state.data.inCitations.length}
                  <div style={{ marginTop: "10px" }}>
                    <Icon type="link" className="paper-details-citation-icon" />
                    References :
                    {this.state.data.outCitations &&
                      this.state.data.outCitations.length}
                  </div>
                </div>
              </div>
              <div>
                {this.state.data.authors &&
                  this.state.data.authors.map(author => (
                    <span className="search-result-author" key={author.name}>
                      {author.name + ""}
                    </span>
                  ))}
              </div>

              {/* {this.state.data.authors &&
                this.state.data.authors.map(author => (
                  <div className="details-author">
                    <a className="author">{author.name}</a>
                  
                  </div>
                ))} */}
              {/* <div className="details-date-written">
                Date Written: February 24, 2019
              </div> */}
              <h2>Abstract</h2>
              <p className="details-abstract">
                {this.state.data.paperAbstract}
                {/* Detecting text from natural images is an ongoing field of
                research. In this paper, we propose a text-extraction and
                detection algorithm pipeline for obtaining information about a
                particular book by using computer vision. Features of the book
                such as its reviews, rating and, the price can be displayed to
                the end user, thus helping people make an informed decision
                about the book on which they are going to spend time reading.
                The text detection algorithm uses edge-enhanced Maximally Stable
                External Region for identifying the text-blob segments
                accompanied by various non-text area filtering algorithms to
                find the bounding boxes. These bounding boxes are then chained
                together and undergo OCR, performed by the Tesseract engine. The
                results of the extracted text are further improved by performing
                post-processing NLP techniques such as domain-based OCR and typo
                correction. The method proposed in this paper has extended use
                cases in different areas of text detection from natural images. */}
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
                      padding: "10px"
                    }}
                  >
                    <Icon
                      type="file-pdf"
                      style={{
                        color: "#1890ff",
                        fontSize: "17px",
                        marginRight: "5px"
                      }}
                    />
                    <span>View PDF</span>
                  </div>
                </a>
              ) : (
                <span></span>
              )}
            </div>
          </div>
          <div className="details-right-div">
            <div className="details-right-paper-statistics">
              <h2> Paper Statistics</h2>
              CITATIONS
              <div>
                <Icon
                  type="bar-chart"
                  className="paper-details-citation-icon"
                />

                {/* <svg
                  className="paper-details-citation-icon"
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

                <span className="paper-details-citation-count">
                  {/* 145 */}
                  {this.state.data.inCitations &&
                    this.state.data.inCitations.length}
                </span>
              </div>
              <div style={{ marginTop: "10px" }}></div>
              {/* references */}
              REFERENCES
              <div>
                <Icon type="link" className="paper-details-citation-icon" />
                <span className="paper-details-citation-count">
                  {this.state.data.outCitations &&
                    this.state.data.outCitations.length}
                </span>
              </div>
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

                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
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
