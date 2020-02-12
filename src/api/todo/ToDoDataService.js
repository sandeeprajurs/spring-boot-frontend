import axios from 'axios';

class ToDoDataService{

    retriveAllTodos(name){
        return axios.get(`http://localhost:8080/users/${name}/todos`);
    }

    retriveTodo(name, id){
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    deletToDo(name, id){
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    updateTod(name, id, todo){
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
    }

    createNewTod(name, todo){
        return axios.put(`http://localhost:8080/users/${name}/todos/${-1}`, todo);
    }

}

export default new ToDoDataService();