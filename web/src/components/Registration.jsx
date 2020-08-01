import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./Registration.css";

import NavBar from "../navbar/NavBar.jsx";
import Footer from "../footer/Footer";

import "antd/dist/antd.css";
import {message} from 'antd';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete
} from "antd";

const {Option} = Select;
const {TextArea} = Input;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: []
        // fname: "",
        // email: "",
        // password: "",
        // institute: "",
        // city: "",
        // phone_number: "",
        // bio: "",
        // hp: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        // const {
        //   fname,
        //   password,
        //   cpass,
        //   email,
        //   institute,
        //   city,
        //   phone_number,
        //   bio,
        //   hp
        // } = this.state;

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios
                    .post(`http://127.0.0.1:5000/api/registration/`, {
                        fname: values.name,
                        password: values.password,
                        email: values.email,
                        institute: values.institute,
                        city: values.city,
                        phone_number: values.phone || "",
                        bio: values.bio || "",
                        hp: values.homepage || "",

                    })
                    .then(res => {
                        message.success(res.data);
                        console.log(res);
                        console.log(res.data);
                    })
                    .catch(function (error) {
                        if (error.response) {
                            message.error(error.response.data);
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                    });
                console.log("Received values of form: ", values);
            }
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue("password")) {
            callback("Passwords donot match, try again!");
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], {force: true});
        }
        callback();
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;
        // const {
        //   fname,
        //   password,
        //   cpass,
        //   email,
        //   institute,
        //   city,
        //   phone_number,
        //   bio,
        //   hp
        // } = this.state;


        const prefixSelector = getFieldDecorator("prefix", {
            initialValue: "91"
        })(
            <Select style={{width: 70}}>
                <Option value="91">+91</Option>
            </Select>
        );

        return (
            <React.Fragment>
                <div className="navbar-outer-div">
                    <NavBar/>
                </div>
                <div style={{paddingTop: "90px"}}></div>

                <div className="registration-container">
                    <h1 className="registration-title">Create your account</h1>

                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            label={
                                <span>
                  Name&nbsp;
                                    <Tooltip title="Full Name as it appears on your research papers">
                    <Icon type="question-circle-o"/>
                  </Tooltip>
                </span>
                            }
                        >
                            {getFieldDecorator("name", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Full Name.",
                                        whitespace: true
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="Enter your full name"
                                    name="fname"
                                    //   value={fname}
                                    //   onChange={this.onChange}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="E-mail">
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!"
                                    },
                                    {
                                        required: true,
                                        message: "Please input your E-mail Address"
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="Enter your Email Address"
                                    name="email"
                                    //   value={email}
                                    //   onChange={this.onChange}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Password" hasFeedback>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your password!"
                                    },
                                    {
                                        validator: this.validateToNextPassword
                                    }
                                ]
                            })(
                                <Input.Password
                                    placeholder="Enter your password"
                                    name="password"
                                    //   value={password}
                                    //   onChange={this.onChange}
                                />
                            )}
                        </Form.Item>
                        <Form.Item label="Confirm Password" hasFeedback>
                            {getFieldDecorator("confirm", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please confirm your password!"
                                    },
                                    {
                                        validator: this.compareToFirstPassword
                                    }
                                ]
                            })(
                                <Input.Password
                                    onBlur={this.handleConfirmBlur}
                                    placeholder="Confirm your Password"
                                    name="cpass"

                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label={
                                <span>
                  Institute&nbsp;
                                    <Tooltip title="E.g., DEPSTAR, Charusat University">
                    <Icon type="question-circle-o"/>
                  </Tooltip>
                </span>
                            }
                        >
                            {getFieldDecorator("institute", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your Institute name",
                                        whitespace: true
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="Provide your Institute Name"
                                    name="institute"
                                    //   value={institute}
                                    //   onChange={this.onChange}
                                />
                            )}
                        </Form.Item>

                        {/*Area of Interest*/}
                        {/* Remove Area of interest for now */}
                        {/* <Form.Item
            label={
              <span>
                Area of Interest&nbsp;
                <Tooltip title="E.g., Machine Learning, Aerospace, Data Analytics">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
          {getFieldDecorator('areaOfInterest', {
                rules: [{ required: true, message: 'Please enter your area of Interest' }],
          })
          (<Select mode="tags" style={{ width: '100%' }} placeholder="Enter your area of Interests" required>
          </Select>)}
          </Form.Item> */}

                        <Form.Item label="City">
                            {getFieldDecorator("city", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input the city",
                                        whitespace: true
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="Enter your city"
                                    name="city"
                                    //   value={city}
                                    //   onChange={this.onChange}
                                />
                            )}
                        </Form.Item>

                        <Form.Item label={
                            <span>
                  Home Page&nbsp;
                                <Tooltip title="E.g., http://xyz.abc or https://xyz.abc">
                    <Icon type="question-circle-o"/>
                  </Tooltip>
                </span>
                        }>
                            {getFieldDecorator("homepage", {
                                rules: [
                                    {required: false, message: "Please enter your Website"},
                                    {
                                        // type: new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi),
                                        pattern: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                                        message: "Please enter a valid URL",
                                        whitespace: false
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="Enter your Website"
                                    name="hp"
                                    //   value={hp}
                                    //   onChange={this.onChange}
                                />
                            )}
                        </Form.Item>

                        <Form.Item size="large" label="Bio">
                            {getFieldDecorator("bio", {
                                rules: [
                                    {required: false, message: "Please enter your Bio"},
                                ]
                            })(
                                <TextArea
                                    placeholder="Write a short bio about yourself"
                                    allowClear
                                    onChange={this.onChange}
                                    // name="bio"
                                    // value={bio}
                                />
                            )}

                        </Form.Item>

                        <Form.Item label="Phone Number">
                            {getFieldDecorator("phone", {
                                rules: [
                                    {
                                        required: false,
                                        message: "Please input your phone number!"
                                    },
                                    {
                                        // type: "number",

                                        pattern: /^\d{10}$/,
                                        message: "Please enter a valid Phone Number",
                                        len: 10,
                                        whitespace: false
                                    }
                                ]
                            })(
                                <Input
                                    placeholder=""
                                    addonBefore={prefixSelector}
                                    style={{width: "100%"}}
                                    name="phone_number"
                                    //   value={phone_number}
                                    //   onChange={this.onChange}
                                />
                            )}
                        </Form.Item>
                        {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: 'Please input the captcha you got!' }],
                })(<Input />)}
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item> */}
                        <Form.Item>
                            {getFieldDecorator("agreement", {
                                valuePropName: "checked"
                            })(
                                <Checkbox>
                                    I agree with <a href="#">Terms & Conditions</a>
                                </Checkbox>
                            )}
                        </Form.Item>
                        <Form.Item
                            className="registration-register-button"
                        >
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* <div className="home-footer"> */}
                    {/* </div> */}
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: "register"})(
    RegistrationForm
);

export default WrappedRegistrationForm;
