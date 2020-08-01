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

  class Details extends React.Component {
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
        rules: [{ type: 'object', required: false, message: 'Select Date of Publishing' }],
      };
      return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width : '60%' , margin : 'auto', paddingTop: '1%', paddingBottom: '5%'}}>
          {/*Journal Name*/}
          <Form.Item label="Journal Name">
            {getFieldDecorator('journalName', {
                rules: [{ required: false, message: 'Enter Journal Name' }],
              })(
                <Input
                  type="input"
                  placeholder="Journal Name"
                />,
              )}
          </Form.Item>

          {/*Date of Publishing*/}
          <Form.Item label="DatePicker">
            {getFieldDecorator('date-picker', config)(<DatePicker />)}
          </Form.Item>

          {/*Abstract*/}
          <Form.Item label="Abstract">
            <TextArea rows={4}/>
          </Form.Item>

          {/* Url */}
          <Form.Item label="Url">
            {getFieldDecorator('url', {
                rules: [{ required: false, message: 'Enter Url' }],
              })(
                <Input
                  type="input"
                  placeholder="Url"
                />,
              )}
          </Form.Item>

          {/* Venue of Conference */}
          <Form.Item label="VenueOfConference">
            {getFieldDecorator('venue', {
                rules: [{ required: false, message: 'Enter Venue of Conference' }],
              })(
                <Input
                  type="input"
                  placeholder="Enter Venue of Conference"
                />,
              )}
          </Form.Item>

          {/* Paper Upload*/}
          <Form.Item label="PaperUpload">
            {getFieldDecorator('paperupload', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>,
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 100, offset: 12 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }

  const Second = Form.create({ name: 'validate_other' })(Details);
  // ReactDOM.render(<Second/>, document.getElementById('root'));
  export default Second;