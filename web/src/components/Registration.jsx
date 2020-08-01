import React from 'react';
import ReactDOM from 'react-dom';

import "./Registration.css";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer";


import 'antd/dist/antd.css';
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
  AutoComplete,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords donot match, try again!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '91',
    })(
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>,
    );
    const onChange = e => {
      console.log(e);
    };


    return (
      <React.Fragment>
        <div className="navbar-outer-div">
          <NavBar />
        </div>
        <div style={{ paddingTop: "90px" }}></div>

      <div className="registration-container">
      
      <h1 className="registration-title">Create your account</h1>


      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span>
              Name&nbsp;
              <Tooltip title="Full Name as it appears on your research papers">
                <Icon type="question-circle-o" />
                  </Tooltip>
             </span>
          }
          >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your Full Name.', whitespace: true }],
          })(<Input placeholder="Enter your full name"/>)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail Address',
              },
            ],
          })(<Input placeholder="Enter your Email Address" />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password placeholder="Enter your password"/>)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} placeholder="Confirm your Password"/>)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Institute&nbsp;
              <Tooltip title="E.g., DEPSTAR, Charusat University">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('institute', {
            rules: [{ required: true, message: 'Please input your Institute name', whitespace: true }],
          })(<Input placeholder='Provide your Institute Name' />)}
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
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Please input the city', whitespace: true }],
            })(<Input placeholder="Enter your city"/>)}
          </Form.Item>

          
          <Form.Item label="Homepage">
            {getFieldDecorator('homepage', {
                rules: [{ required: false, message: 'Please enter your Website' }],
            })(<Input placeholder="Enter your Website"/>)}
          </Form.Item>

          <Form.Item size="large" label="Bio">
                        <TextArea placeholder="Write a short bio about yourself" allowClear onChange={onChange} />
          </Form.Item>
          
          <Form.Item label="Phone Number">
              {getFieldDecorator('phone', {
                  rules: [{ required: false, message: 'Please input your phone number!' }],
              })(<Input placeholder='' addonBefore={prefixSelector} style={{ width: '100%' }} />)}
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
          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                I agree with <a href="#">Terms & Conditions</a>
              </Checkbox>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="registration-register-button">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
      </Form>
      {/* <div className="home-footer"> */}
        {/* </div> */}
      </div>
          <Footer />
      </React.Fragment>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);


export default WrappedRegistrationForm;
