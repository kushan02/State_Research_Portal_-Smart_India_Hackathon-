import React from 'react';
import ReactDOM from 'react-dom';
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Input,
    Rate,
    Checkbox,
    Row,
    Col,
  } from 'antd';
  const { TextArea } = Input;
  const { Option } = Select;
  {/* If DOI is not found in the database the user is asked to fill a form to upload the paper*/}

  class Author extends React.Component {
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };

    normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      };
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width : '60%' , margin : 'auto', paddingTop: '1%', paddingBottom: '5%'}}>
          {/*Author Name*/}
          <Form.Item label="Author Name">
          {getFieldDecorator('authorname', {
                rules: [{ required: true, message: 'authorname' }],
              })
          (<Select mode="tags" style={{ width: '100%' }} placeholder="Author Name" >
          </Select>)}
          </Form.Item>


          {/*Area of Study*/}
          <Form.Item label="Area of Study">
          {getFieldDecorator('areaOfStudy', {
                rules: [{ required: true, message: 'areaOfStudy' }],
          })
          (<Select mode="tags" style={{ width: '100%' }} placeholder="Area of Study or Department" required>
          </Select>)}

          </Form.Item>

          {/* University */}
          <Form.Item label="University">
            {getFieldDecorator('college', {
                rules: [{ required: true, message: 'college' }],
              })(
                <Input
                  type="input"
                  placeholder="College or Affiliation"
                />
              )}
          </Form.Item>

          {/* Email */}
          <Form.Item label="Email">
            {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Email', type:'email' }],
              })(
                <Input
                  type="email"
                  placeholder="Email"
                />
              )}
          </Form.Item>
        </Form>
      );
    }
  }

  const Third = Form.create({ name:'third_form' })(Author);
  // ReactDOM.render(<Third/>, document.getElementById('root'));
  export default Third;