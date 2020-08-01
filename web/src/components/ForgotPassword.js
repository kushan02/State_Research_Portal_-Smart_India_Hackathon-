import React from 'react';
// import './welc.css'
import {Button, Form, Icon, Input} from "antd";
import ReactDOM from 'react-dom'

import NavBar from "./NavBar.jsx";
import Footer from "./Footer";

import "./ForgotPassword.css"
class forgotForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <React.Fragment>
             <div className="navbar-outer-div">
          <NavBar />
        </div>
            <Form onSubmit={this.handleSubmit} className="forgot-password-form"
                //   style={{width: '20%', margin: 'auto', paddingTop: '19%'}}
                >


                <Form.Item>
                    {getFieldDecorator('e-mail address', {
                        rules: [{required: true, message: 'Please enter your E-mail Address!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="E-mail address"
                        />,
                    )}
                </Form.Item>

                <Button type="primary" htmlType="submit" className="login-form-button" style={{ width : '100%' }}>
                    Send OTP
                </Button>
            </Form>
            <div className="home-footer">
          <Footer />
        </div>
      </React.Fragment>
        );
    }
}
const WrappedNormalForgotForm = Form.create({ name: 'normal_login' })(forgotForm);
// ReactDOM.render(<WrappedNormalForgotForm/>, document.getElementById('root'));
export default WrappedNormalForgotForm;