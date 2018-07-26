import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import TodoList from './TodoList';

let id = 1;

const defaultTodo = {
    id: '',
    todo: '',
    date: '',
    completed: ''
};

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: { ...defaultTodo },
            data: [
                // { id: id++, text: 'Todo 1', date: '2018-04-17', completed: false },
                // { id: id++, text: 'Todo 2', date: '2018-05-06', completed: true },
            ],
            filter: 'All',
        };
    }

    componentDidMount() {
        console.log('Component DID MOUNT!')
        fetch('http://localhost:4000/todo')
            .then((res) => res.json())
            .then((result) => {
                console.log('result', result),
                    this.setState({ data: result.todos });
            })
    }

    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        console.log('shouldcomponentupdate')
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }

    findTodoIndexById(id) {
        const { data } = this.state;
        return data.findIndex(x => x.id === id);
    }

    todoChanges(key, value) {
        const { todo } = this.state;
        todo[key] = value;
        this.setState({ todo: { ...todo } });
    }

    saveTodo() {
        const { todo, data } = this.state;
        if (todo.id) {
            //edit
            const { data } = this.state;
            const findTodoIndex = this.findTodoIndexById(todo.id);
            data[findTodoIndex] = todo;
            fetch('http://localhost:4000/todo/' + todo.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data[findTodoIndex])
            }).then((res) => res.json())
                .then((result) => {
                    this.setState({ data: [...data], todo: { ...defaultTodo } });
                })
        }
        else {
            //add
            fetch('http://localhost:4000/todo/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: ++id,
                    todo: todo.todo,
                    date: todo.date,
                    completed: false
                })
            }).then((res) => res.json())
                .then((result) => {
                    this.setState({ data: [result.todo, ...data], todo: { ...defaultTodo } })
                })
        }
    }

    toggleTodo(id) {
        const { data } = this.state;
        const findTodoIndex = this.findTodoIndexById(id);
        data[findTodoIndex].completed = !data[findTodoIndex].completed;
        this.setState({ data: [...data] });
    }

    editTodo(id) {
        console.log('edit', id);
        const { data } = this.state;
        const findTodoIndex = this.findTodoIndexById(id);
        console.log('edit::', data[findTodoIndex])
        this.setState({ todo: { ...data[findTodoIndex] } });
    }

    removeTodo(id) {
        const { data } = this.state;
        const findTodoIndex = this.findTodoIndexById(id);
        fetch('http://localhost:4000/todo/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then((result) => {
                data.splice(findTodoIndex, 1);
                this.setState({ data: [...data] })
            })
    }

    getFilterTodos() {
        const { data, filter } = this.state;
        switch (filter) {
            case 'Completed':
                return data.filter(x => x.completed);
            case 'Pending':
                return data.filter(x => !x.completed);
            default:
                return data;
        }
    }

    render() {
        const { todo, data } = this.state;
        console.log('render', data);

        return (
            <div className="todo-app">
                <h1 style={{ color: 'darkblue' }}> Todo Application </h1>
                <TodoForm
                    data={todo}
                    onChange={(key, value) => this.todoChanges(key, value)}
                    onSave={() => this.saveTodo()}
                />
                <TodoFilter
                    onFilter={(filter) => this.setState({ filter })}
                />
                <TodoList
                    onEditTodo={(id) => this.editTodo(id)}
                    onRemoveTodo={(id) => this.removeTodo(id)}
                    onToggleTodo={(id) => this.toggleTodo(id)}
                    data={this.getFilterTodos()}
                />
            </div>
        );
    }
}

export default TodoApp;