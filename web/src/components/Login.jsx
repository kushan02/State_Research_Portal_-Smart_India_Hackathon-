import React from "react";
import "./Login.css";
import { Button, Checkbox, Form, Icon, Input, Divider } from "antd";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const responseGoogle = response => {
      console.log(response);
    };
    return (
      <React.Fragment>
        <div className="navbar-outer-div">
          <NavBar />
        </div>
        <div style={{ paddingTop: "90px" }}></div>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form-sign-in"
          style={
            {
              // width: "40%",
              // margin: "auto",
              // paddingTop: "15vh",
              // textAlign: "center"
            }
          }
        >
          <div style={{ width: "100%" }}>
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              style={{ width: "100%" }}
            />
          </div>

          <Divider>OR</Divider>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(
              <Checkbox style={{ paddingRight: "20%" }}>Remember me</Checkbox>
            )}
            {/* <a className="login-form-forgot" href=""> */}
            <Link to="/forgot-password">Forgot password</Link>
            {/* </a> */}
            <br />
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Log in
            </Button>
            Or
            {/* <a href=""> */}
            <Link to="/registration">
              <span style={{ marginLeft: "15px" }}>Sign Up!</span>
            </Link>
            {/* </a> */}
          </Form.Item>
        </Form>
        <div className="home-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

// ReactDOM.render(<WrappedNormalLoginForm/>, document.getElementById('root'));
export default WrappedNormalLoginForm;
