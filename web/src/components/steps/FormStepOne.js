import React from 'react';
import {Button, Checkbox, Form, Icon, Input, Divider} from "antd";
import ReactDOM from 'react-dom'

class NormalLoginForm extends React.Component {
  state={
  }
  handleSubmit = e => {
    // alert("child")

   e.preventDefault();
   this.props.handleFirstFormSubmit()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: child ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const responseGoogle = (response) => {console.log(response);};
    return (
      <Form
       onSubmit={this.handleSubmit} 
       className="login-form" style={{ width : '50%' , margin : 'auto', paddingTop: '1%', paddingBottom: '5%'}}>
                {/*Paper title*/}
        <Form.Item>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Enter Paper Title' }],
          })(
            <Input
              placeholder="Enter Paper Title"
            />,
          )}
        </Form.Item>
        {/*Paper doi*/}
        <Form.Item>
          {getFieldDecorator('doi', {
            rules: [{ required: false, message: 'Enter DOI' }],
          })(
            <Input
              type="input"
              placeholder="Enter DOI"
            />,
          )}
        </Form.Item>
        {/*Button*/}

        <Form.Item style={{display:"none"}}>
          <Button id="lookup-paper-button" type="primary" htmlType="submit" className="login-form-button" style={{ width : '100%' }}>
            Lookup Paper
          </Button>
        </Form.Item>
        {/* <Form.Item wrapperCol={{ span: 100 }}> */}
        <div style={{textAlign:"center"}}>
         
            <Button type="primary"  htmlType="submit" loading={this.props.buttonLoading} >
          Next
        </Button>
            </div>
          {/* </Form.Item> */}
      </Form>
    );
  }
}

const First = Form.create()(NormalLoginForm);
// ReactDOM.render(<First/>, document.getElementById('root'));
export default First;
