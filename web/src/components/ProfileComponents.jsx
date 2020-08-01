import React, { Component } from 'react'
import "./ProfileComponents.css"

import Account from"./profile/Account"
import Info from"./profile/Info"
import ChangePassword from"./profile/ChangePassword"
import Email from"./Email"
import SecurityLog from"./profile/SecurityLog"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export class ProfileComponents extends Component {
    render() {
        return (
            <div 
            // style={{padding:"30px",paddingTop:"0px"}}
             className="profile-component-container">
            <Route exact path="/profile/info" render={props => <Info {...props}/>} />
            <Route exact path="/profile/account" render={props => <Account {...props}/>} />
            <Route exact path="/profile/security" render={props => <ChangePassword {...props}/>} />
            {/* <Route exact path="/profile/email" render={props => <Email {...props}/>} /> */}
            <Route exact path="/profile/security-log" render={props => <SecurityLog {...props}/>} />

                
            </div>
        )
    }
}

export default ProfileComponents
