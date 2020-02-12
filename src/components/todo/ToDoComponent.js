import React, { Component } from "react";
import moment, { relativeTimeRounding } from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ToDoDataService from "../../api/todo/ToDoDataService";
import AuthenticationService from "./AuthenticationService";

export default class ToDoComponent extends Component{

    state = {
        id: this.props.match.params.id,
        description: '',
        targetDate: ''
    }

    componentDidMount(){
        if(this.state.id == -1)
            return;
        let username = AuthenticationService.getLoggedInUserName();
        ToDoDataService.retriveTodo(username, this.state.id).
        then(response =>  this.setState({ description: response.data.description, targetDate: moment(response.data.targetDate).format("YYYY-MM-DD") }));
    }

    validate = (values) => {
        let errors = {};
        if(!values.description){
            errors.description = "Enter a Description"
        }else if(values.description.length < 5){
            errors.description = "Enter atleast 5 characters in Description"
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a valid Target Date"
        }
        return errors
    }

    onSubmit = (values) => {
        let username = AuthenticationService.getLoggedInUserName();
        let todo = {
            id: this.state.id,
            username: username,
            description: values.description,
            targetDate: values.targetDate
        }

        if(this.state.id == -1)
            ToDoDataService.createNewTod(username, todo).then(() => this.props.history.push("/todos")); 
        else
            ToDoDataService.updateTod(username, this.state.id, todo).then(() => this.props.history.push("/todos"));
    }

    render(){
        let {description, targetDate} = this.state;
     
        return(
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik 
                        initialValues={{ description, targetDate }} 
                        onSubmit={this.onSubmit}
                        validateOnBlur = {false}
                        validateOnChange = {false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => {
                                return (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="text" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>)
                            }
                        }
                    </Formik>
                </div>
            </div>
        )
    }
} 