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
    Col,
    message,
    Divider
} from "antd";
import "./FormStep.css"

const {TextArea} = Input;
const {Option} = Select;
{
    /* If DOI is not found in the database the user is asked to fill a form to upload the paper*/
}

class FormStepFinal extends React.Component {
    state = {
        authorArray: [0]
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                message.success("Processing complete!");

            } else {
                window.scroll({top: 0, left: 0, behavior: 'smooth'});
                message.error("Please complete filling the author details");
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

    add = () => {
        let arr = this.state.authorArray;
        arr.push(arr[arr.length - 1] + 1);
        this.setState({authorArray: arr});
    };

    remove = key => {
        var value = key;

        var arr = this.state.authorArray;

        arr = arr.filter(function (item) {
            return item !== value;
        });
        this.setState({authorArray: arr});
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            layout: "vertical"
        };
        const config = {
            rules: [
                {type: "object", required: true, message: "Please select time!"}
            ]
        };
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="step-container">
                {this.state.authorArray.map(num => (
                    <React.Fragment>
                        {num > 0 ? (
                            <Divider orientation="right">
                                {/* <Icon
                  // style={{float:"right",marginRight:"50px"}}
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={() => this.remove(num)}
                /> */}
                                <Icon type="close-circle" className="dynamic-delete-button"
                                      onClick={() => this.remove(num)}/>
                            </Divider>
                        ) : null}

                        <div>
                            <Form.Item label="Author Name">
                                {getFieldDecorator(`authorname[${num}]`, {
                                    rules: [{required: true, message: "Enter Author Name"}]
                                })(
                                    <Input type="input" placeholder="Author Name"/>
                                )}
                            </Form.Item>

                            <Form.Item label="University">
                                {getFieldDecorator(`college[${num}]`, {
                                    rules: [{required: true, message: "Enter College/Affiliation"}]
                                })(<Input type="input" placeholder="Enter College or Affiliation"/>)}
                            </Form.Item>

                            <Form.Item label="Email">
                                {getFieldDecorator(`email[${num}]`, {
                                    rules: [{required: true, message: "Enter Email", type: "email"}]
                                })(<Input type="email" placeholder="Enter Email"/>)}
                            </Form.Item>
                        </div>
                    </React.Fragment>
                ))}
                <Button type="dashed" onClick={this.add} style={{width: "100%"}}> <Icon type="plus"/> Add Author
                </Button>

                <div style={{textAlign: "center", marginTop: "50px"}}>
                    <Button onClick={this.props.prev} style={{marginRight: "10px"}}> Previous </Button>
                    <Button type="primary" htmlType="submit" style={{marginLeft: "10px"}}> Done </Button>
                </div>
            </Form>
        );
    }
}

const Third = Form.create({name: "third_form"})(FormStepFinal);
// ReactDOM.render(<Third/>, document.getElementById('root'));
export default Third;
