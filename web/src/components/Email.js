
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button, Input, Typography, Divider, Form } from 'antd';

const { Title, Paragraph, Text } = Typography;
const ButtonGroup = Button.Group;

class Email extends React.Component {
    render() {
        return(
        <Typography>
            <Title level={2}>Email</Title>
            <Text strong>Primary Email</Text>
            <Paragraph>
            <Text >Because you have email privacy enabled, yourExistingEmail@email.com will be used for account-related notifications as well as password resets</Text> 
            </Paragraph>
            <Form layout='inline'>
                <Form.Item>
                    <Input placeholder="yourExistingEmail@email.com" />
                </Form.Item>
                <Form.Item>
                    <ButtonGroup>
                        <Button>Primary</Button>
                        <Button>Secondary</Button>
                    </ButtonGroup>
                </Form.Item>
            </Form>
            <br/>
            <Text strong>Add Email</Text>
            <Form layout='inline'>
                <Form.Item>
                    <Input placeholder="newEmail@email.com" />
                </Form.Item>
                <Form.Item>
                    <ButtonGroup>
                        <Button htmltype='submit'>Add</Button>
                    </ButtonGroup>
                </Form.Item>
            </Form>
        </Typography>
        );
        }
}

export default Email;