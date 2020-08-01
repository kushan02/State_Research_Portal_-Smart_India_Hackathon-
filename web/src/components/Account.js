import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Typography, Divider, Button, Radio } from "antd";

const { Title, Paragraph, Text } = Typography;

class Account extends React.Component {
  render() {
    return (
      <div>
        <Typography>
          <Title level={2}>Change E-mail</Title>
          <Paragraph>
            Changing your E-mail can have unintended side effects.
          </Paragraph>
          <Button type="primary" >
            Change E-mail
          </Button>
          <Divider />

          {/* <Title level={2}>Mobile settings</Title> */}
          {/* <Radio>
            <b>Opt out of mobile pages</b>
          </Radio>
          <Paragraph>
            This will cause all your sessions and devices to only experience the
            desktop site for all pages. Pages designed to be responsive will
            still scale down properly.
          </Paragraph>
          <Button type="primary" >
            Update Mobile Settings
          </Button>
          <Divider /> */}
          <Title level={2}>Delete Account</Title>
          <Paragraph>
            Once you delete your account, there is no going back. Please be
            certain.
          </Paragraph>
          <Button type="danger" >
            Delete account
          </Button>
          <Divider />
        </Typography>
      </div>
    );
  }
}
export default Account;
