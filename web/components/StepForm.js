import React, { Component } from "react";
import { Steps, Button, Form, message } from "antd";
import ReactDOM from "react-dom";
// import '/Users/meghasankhlecha/Desktop/Megha/SIH/Test/my-app/src/App.css';
import First from "./steps/FormStepOne";
import Second from "./steps/FormStepTwo";
import Third from "./steps/FormStepFinal";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer";

import "./StepForm.css"

const { Step } = Steps;

class StepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }
  // handleSubmit=()=>{
  //       alert("sadjhdasjh");

  // }
  // handleSubmit = e => {
  //       alert("1");

  //   // console.log("handleSubmit")
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // };

  validateInput() {
    // alert("2");

    // document.getElementById("lookup-paper-button").click();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        if (values.title) {
          this.next();
        }
      }
    });
    // alert("sadjhdasjh");
    // this.next();
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    let steps = [
      {
        title: "Paper Lookup",
        content: <First form={this.props.form} />
      },
      {
        title: "Paper Details",
        content: <Second form={this.props.form} />
      },
      {
        title: "Author Details",
        content: <Third form={this.props.form} />
      }
    ];
    return (
      <React.Fragment>
      <NavBar />
      <Form
        onSubmit={this.handleSubmit}
        className="login-form step-outer-container"
        // style={{ width: "70%", margin: "auto", paddingTop: "3%" ,paddingBottom:"30px"}}
      >
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          {/* <div className="steps-action">
            {current < steps.length - 1 && (
              <Button
                type="submit"
                onClick={() => this.validateInput()}
                style={{ width: "10%", marginLeft: "45%" }}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
                style={{ width: "10%", marginLeft: "45%" }}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div> */}
                  <div className="steps-action steps-action-button-button">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()} 
            // style={{width:'10%', marginLeft: '42%'}}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')} 
            // style={{width:'10%', marginLeft: '45%'}}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
        </div>
      </Form>
        {/* <div className="home-footer"> */}
          <Footer />
        {/* </div> */}
      </React.Fragment>
    );
  }
}
const Final = Form.create()(StepForm);
// ReactDOM.render(<Final />, document.getElementById("root"));
export default Final;

// import React, { Component } from "react";
// import { Steps, Button, Form, message } from "antd";
// import ReactDOM from "react-dom";
// // import '/Users/meghasankhlecha/Desktop/Megha/SIH/Test/my-app/src/App.css';
// import First from "./steps/FormStepOne";
// import Second from "./steps/FormStepTwo";
// import Third from "./steps/FormStepFinal";

// import NavBar from "./NavBar.jsx";
// import Footer from "./Footer";

// const { Step } = Steps;

// class StepForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       current: 0,
//     };
//   }

//   next() {
//     const current = this.state.current + 1;
//     this.setState({ current });
//   }

//   prev() {
//     const current = this.state.current - 1;
//     this.setState({ current });
//   }

//   render() {
//     const { current } = this.state;
//      let steps = [
//       {
//         title: "Paper Lookup",
//         content: <First form={this.props.form} />
//       },
//       {
//         title: "Paper Details",
//         content: <Second form={this.props.form} />
//       },
//       {
//         title: "Author Details",
//         content: <Third form={this.props.form} />
//       }
//     ];
//     return (
//      <Form onSubmit={this.handleSubmit} className="login-form" style={{ width : '70%' , margin : 'auto', paddingTop: '3%'}}>
//       <div>
//         <Steps current={current}>
//           {steps.map(item => (
//             <Step key={item.title} title={item.title} />
//           ))}
//         </Steps>
//         <div className="steps-content">{steps[current].content}</div>
        // <div className="steps-action">
        //   {current < steps.length - 1 && (
        //     <Button type="primary" onClick={() => this.next()} style={{width:'10%', marginLeft: '45%'}}>
        //       Next
        //     </Button>
        //   )}
        //   {current === steps.length - 1 && (
        //     <Button type="primary" onClick={() => message.success('Processing complete!')} style={{width:'10%', marginLeft: '45%'}}>
        //       Done
        //     </Button>
        //   )}
        //   {current > 0 && (
        //     <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
        //       Previous
        //     </Button>
        //   )}
        // </div>
//       </div>
//       </Form>
//     );
//   }
// }
// const Final = Form.create()(StepForm);
// // ReactDOM.render(<Final/>, document.getElementById('root'));
// export default Final;
