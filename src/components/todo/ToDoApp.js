import React, {Component} from "react";
import LoginComponent from "./LoginComponent.js";
import WelcomeComponent from "./WelcomeComponent.js";
import ErrorComponent from "./ErrorComponent.js";
import ListTodosComponent from "./ListTodosComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent.js";
import LogoutComponent from "./LogoutComponent.js";
import AuthenticatedRoute from "./AuthenticatedRoute.js";
import ToDoComponent from "./ToDoComponent.js";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


export default class ToDoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
                    <Router>
                        <HeaderComponent /> 
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                            <AuthenticatedRoute path="/todos/:id" component={ToDoComponent} />
                            <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
                            <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                        <FooterComponent/> 
                    </Router>              
            </div>
        )
    }
}