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
const AutoCompleteOption = AutoComplete.Option;
const residences = [
  {
    value: 'ahmedabad',
    label: 'Ahmedabad',
  },
  {
    value: 'vijaywada',
    label: 'Vijaywada',
  },
  {
    value: 'visakhapatnam',
    label: 'Visakhapatnam',
  },
];

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
      callback('Two passwords that you enter is inconsistent!');
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

  handleHomepageChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
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

    const homepageOptions = autoCompleteResult.map(homepage => (
      <AutoCompleteOption key={homepage}>{homepage}</AutoCompleteOption>
    ));

    return (
      <React.Fragment>
        <NavBar />
      <div className="registration-container">
      
      <h1 className="registration-title">Create your account</h1>


      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
          label={
            <span>
              Name&nbsp;
              <Tooltip title="Full Name as it appears on your articles">
                <Icon type="question-circle-o" />
                  </Tooltip>
             </span>
          }
          >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
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
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
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
          })(<Input.Password />)}
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
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Affiliation&nbsp;
              <Tooltip title="E.g., Professor of Physics, Charusat University">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('affiliation', {
            rules: [{ required: true, message: 'Please input your Affiliation', whitespace: true }],
          })(<Input placeholder='' />)}
            </Form.Item>
        <Form.Item label="Area Of Interest">
             {getFieldDecorator('areaOfInterest', {
                    rules: [{ required: false, message: 'Please enter your Area of Interest!' }],
             })(<Input placeholder='Like General Relativity, Unified field theory' />)}
        </Form.Item>
        <Form.Item label="Homepage">
           {getFieldDecorator('homepage', {
              rules: [{ required: false, message: 'Please enter your website!' }],
           })(
              <AutoComplete
                 dataSource={homepageOptions}
                 onChange={this.handleHomepageChange}
                 placeholder="E.g. http://www.charusatuniversity/~einstein"
              >
              <Input />
              </AutoComplete>,
             )}
        </Form.Item>
        <Form.Item label="Location">
                {getFieldDecorator('residence', {
                    initialValue: ['Visakhapatnam', 'Vijayawada', 'Amaravati'],
            rules: [
              { type: 'array', required: false, message: 'Please select your residence!' },
            ],
          })(<Cascader placeholder='Like Ahmedabad, Vijayawada, Visakhapatnam' options={residences} />)}
        </Form.Item>
        <Form.Item label="Phone Number">
            {getFieldDecorator('phone', {
                 rules: [{ required: false, message: 'Please input your phone number!' }],
            })(<Input placeholder='' addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
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
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
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