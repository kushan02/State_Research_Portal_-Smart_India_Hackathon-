import React from "react";
import ReactDOM from "react-dom";
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
  Col
} from "antd";
const { TextArea } = Input;
const { Option } = Select;
{
  /* If DOI is not found in the database the user is asked to fill a form to upload the paper*/
}

class Details extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.handleSecondFormSubmit();
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const config = {
      rules: [
        { type: "object", required: true, message: "Select Date of Publishing" }
      ]
    };
    return (
      <React.Fragment>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{
            width: "60%",
            margin: "auto",
            paddingTop: "1%",
            paddingBottom: "5%"
          }}
        >
          {/*Journal Name*/}
          <Form.Item label="Journal Name">
            {getFieldDecorator("journalName", {
              rules: [{ required: true, message: "Enter Journal Name" }]
            })(<Input type="input" placeholder="Journal Name" />)}
          </Form.Item>

          {/*Date of Publishing*/}
          <Form.Item label="Date of Publication">
            {getFieldDecorator(
              "date-picker",
              config
            )(<DatePicker style={{ width: "100%" }} />)}
          </Form.Item>

          {/* Url */}
          <Form.Item label="Url">
            {getFieldDecorator("url", {
              rules: [
                { required: true, message: "Enter Url of published paper" }
              ]
            })(
              <Input
                type="input"
                placeholder="Enter the url of published paper"
              />
            )}
          </Form.Item>

          {/* Venue of Conference */}
          <Form.Item label="Conference">
            {getFieldDecorator("conference", {
              rules: [
                { required: true, message: "Enter name of the Conference" }
              ]
            })(<Input type="input" placeholder="Enter the Conference name" />)}
          </Form.Item>
          <Form.Item label="Venue Of Conference">
            {getFieldDecorator("venue", {
              rules: [
                { required: true, message: "Enter the Venue of Conference" }
              ]
            })(
              <Input type="input" placeholder="Enter the Venue of Conference" />
            )}
          </Form.Item>

          {/*Abstract*/}
          <Form.Item label="Abstract">
            {getFieldDecorator("abstract", {
              rules: [{ required: true, message: "Enter the Abstract" }]
            })(<TextArea placeholder="" rows={4} />)}
          </Form.Item>

          {/* Paper Upload*/}
          <Form.Item label="Upload your Paper">
            {getFieldDecorator("paperupload", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile,
              rules: [{ required: true, message: "Upload your research Paper" }]
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            )}
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Button onClick={this.props.prev} style={{ marginRight: "10px" }}>
              Previous
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "10px" }}
            >
              Next
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

const Second = Form.create({ name: "validate_other" })(Details);
// ReactDOM.render(<Second/>, document.getElementById('root'));
export default Second;
