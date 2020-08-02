import React from "react";
import "./Login.css";
import {
    Button, Checkbox, Form, Icon, Input, Divider, Modal, message, Tag
} from "antd";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import NavBar from "../navbar/NavBar.jsx";
import Footer from "../footer/Footer";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import constants from "../../constants";


class NormalLoginForm extends React.Component {
    state = {
        loadingConformPassword: false,
        visibleConformPasswordPopup: false,
        incorrectPasswordMessage: false
    };

    showConformPasswordModal = () => {
        this.setState({
            visibleConformPasswordPopup: true,
        });
    };


    handleConformPasswordOk = () => {
        this.props.form.validateFieldsAndScroll(['e-mail address'], (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                if (values["e-mail address"]) {
                    this.setState({loadingConformPassword: true});
                    setTimeout(() => {
                        message.info("Please check your email and click on the provided link to reset your password.", 5);
                        this.setState({
                            loadingConformPassword: false,
                            visibleConformPasswordPopup: false,
                        });
                    }, 1000);
                }
            }
        });
    };

    handleConformPasswordCancel = () => {
        this.setState({visibleConformPasswordPopup: false});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({incorrectPasswordMessage: false});

        this.props.form.validateFields(['email', 'password'], (err, values) => {
            if (!err) {
                axios.post(constants.flaskServerUrl + 'login/', {
                    user_email: values.email,
                    password: values.password,
                }).then((res) => {
                    console.log(res.status);
                    console.log(res.config.data);
                    if (res.status === 200) {
                        message.success("Login successful. Redirecting you to homepage...");
                        localStorage.setItem('login-data', JSON.stringify(res.config.data));

                        setTimeout(() => {
                            this.props.history.push("/");
                        }, 3000);


                    } else {
                        this.setState({incorrectPasswordMessage: true})
                    }
                })
                    .catch((error) => {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);

                            if (error.response.status === 401) {
                                this.setState({incorrectPasswordMessage: true});
                                message.error("Incorrect credentials entered. Please try again.", 5);
                            } else {
                                message.error("Error! try again");
                            }
                        }
                    });

                console.log("Received values of form: ", values);
            }
        });
    };

    responseGoogle = (response) => {
        console.log(response);
        message.success("Login via Google successful", 3);
        let user_name = response["profileObj"]["name"];
        let user_email = response["profileObj"]["email"];
        let data = {"user_name": user_name, "user_email": user_email, "profile_completed": false};
        localStorage.setItem('google-oauth-data', JSON.stringify(data));

        setTimeout(() => {
            this.props.history.push("/registration");
            message.info("Please complete your profile to access all the features of the site", 7);
        }, 3000);
    };

    render() {
        const {getFieldDecorator} = this.props.form;


        return (
            <React.Fragment>
                <Modal
                    visible={this.state.visibleConformPasswordPopup}
                    title="Enter your email address"
                    onOk={this.handleConformPasswordOk}
                    onCancel={this.handleConformPasswordCancel}
                    footer={[
                        <Button key="back" onClick={this.handleConformPasswordCancel}> Return </Button>,
                        <Button type="primary" loading={this.state.loadingConformPassword}
                                onClick={this.handleConformPasswordOk}>
                            Submit
                        </Button>,
                    ]}>

                    <Form>
                        <Form.Item>
                            {getFieldDecorator("e-mail address", {
                                rules: [{
                                    required: true,
                                    message: "Please enter your registered email address",
                                    type: "email"
                                }],
                            })(
                                <Input prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                       placeholder="E-mail address"/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>

                <div className="navbar-outer-div"><NavBar/></div>

                <div style={{paddingTop: "90px"}}></div>

                <Form onSubmit={this.handleSubmit} className="login-form-sign-in">

                    <div style={{width: "100%"}}>
                        <GoogleLogin
                            clientId={constants.google_oauth_client_id}
                            buttonText="Login With Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={"single_host_origin"}
                            style={{width: "100%"}}
                        />
                    </div>

                    <Divider>OR</Divider>

                    <Form.Item>
                        {getFieldDecorator("email", {
                            rules: [
                                {required: true, message: "Please enter your email", type: "email"},
                            ]
                        })(
                            <Input type="email" prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                                   placeholder="Email"/>
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [
                                {required: true, message: "Please enter your password"},
                            ],
                        })(
                            <Input type="password" prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                                   placeholder="Password"/>
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator("remember", {
                            valuePropName: "checked",
                            initialValue: true,
                        })(
                            <Checkbox style={{paddingRight: "20%"}}>Remember me</Checkbox>
                        )}

                        <span style={{color: "#1890ff", cursor: "pointer"}} onClick={this.showConformPasswordModal}>
                            Forgot password?
                        </span>

                        <br/>

                        {/*{this.state.incorrectPasswordMessage && <Tag color="red">Incorrect user id or password !</Tag>}*/}

                        <Button type="primary" htmlType="submit" className="login-form-button"
                                style={{width: "100%", marginTop: "20px"}}>
                            Log in
                        </Button>
                        Don't have an account?
                        <Link to="/registration"> <span style={{marginLeft: "5px"}}>Sign Up!</span> </Link>
                    </Form.Item>
                </Form>

                <div className="home-footer">
                    <Footer/>
                </div>

            </React.Fragment>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: "normal_login"})(
    NormalLoginForm
);

// ReactDOM.render(<WrappedNormalLoginForm/>, document.getElementById('root'));
export default WrappedNormalLoginForm;
