import  React, {Component} from "react";
import ToDoDataService from "../../api/todo/ToDoDataService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from "moment";

export default class ListTodosComponent extends Component{

    state = {
        todos:[],
        message : null
    }

    componentDidMount(){
       this.refreshTodos();
    }

    deleteToDoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName();
        ToDoDataService.deletToDo(username, id).then( response => {
            this.setState({ message: `Delete of todo of id ${id} successful` });
            this.refreshTodos();
        });
    }

    updateToDoClicked = (id) => {
        this.props.history.push(`/todos/${id}`);
    }

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUserName();
        ToDoDataService.retriveAllTodos(username).then(
            response => {
                console.log(response);
                this.setState({ todos: response.data });
            }
        );
    }

    addNewToDo = () => {
        this.props.history.push('/todos/-1');
    }

    render(){
        return(
            <div>
                <h1>List of Todos</h1>
                { this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Description</td>
                                <td>Done</td>
                                <td>Date</td>
                                <td>Update</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map( todo => {
                                    return (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                        <td><button onClick={() => this.updateToDoClicked(todo.id)} className="btn btn-success">Update</button></td>
                                        <td><button onClick={() => this.deleteToDoClicked(todo.id)} className="btn btn-warning">Delete</button></td>
                                    </tr>)
                                })  
                            }
                        </tbody>
                    </table>
                    <button onClick={this.addNewToDo} className="btn btn-success">Add</button>
                </div>
            </div>
        )
    }
}