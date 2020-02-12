import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService.js";


export default class LoginComponent extends Component{

    state = {
        username: "",
        password: "",
        hasLoginFailed: false,
        showSuccessMessage: false
    }

    handleChange = (event) => {
        this.setState({ [event.target.name] : event.target.value })
    }

    loginClicked = () => {
        // if(this.state.username === "sandeep" && this.state.password === "admin"){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.props.history.push(`/welcome/${this.state.username}`);
        //     // this.setState({ hasLoginFailed: false, showSuccessMessage: true });
        // }
        // else
        //     this.setState({ hasLoginFailed: true, showSuccessMessage: false });

        AuthenticationService
        .executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(response => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.props.history.push(`/welcome/${this.state.username}`);
            }
        )
        .catch(
            response => { this.setState({ hasLoginFailed: true, showSuccessMessage: false }); }
        );
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/* <ShowInvalidCredentials hasLoginFailed = {this.state.hasLoginFailed} />
                    <ShowLoginSuccessMessage showSuccessMessage = {this.state.showSuccessMessage} /> */}
                    { this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div> }
                    { this.state.showSuccessMessage && <div>Login Successful</div> }
                    User Name : <input type="text" name="username" onChange={this.handleChange} value={this.state.userName} />
                    Password : <input type="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

// function ShowInvalidCredentials(props){
//     if(props.hasLoginFailed)
//         return <div>Invalid Credentials</div>
//     return null;
// }

// function ShowLoginSuccessMessage(props){
//     if(props.showSuccessMessage)
//         return <div>Login Successful</div>
//     return null
// }