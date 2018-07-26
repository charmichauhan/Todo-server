import React, { Component } from 'react';

class TodoList extends Component {
    render() {
        const { data, onToggleTodo, onEditTodo, onRemoveTodo } = this.props;
        let s1;

        return (
            <div className="todo-list">
                <div className="todoListMain">            
                    <ul className="theList">
                    {
                        data.map((todo, id) => (
                            console.log('id', todo.id),
                            s1 = todo.date.substring(0, todo.date.indexOf('T')),                       
                            <li
                                key={todo.id}
                                className={todo.completed ? "animated" :""}  
                            >
                                <span style={{marginRight: '50px'}} onClick={() => onToggleTodo(todo.id)}>
                                    {todo.todo}
                                    ({s1})                                     
                                </span>
                                <button onClick={() => onRemoveTodo(todo.id)}> X </button>
                                <button onClick={() => onEditTodo(todo.id)}> Edit </button>                                
                            </li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        );
    }
}

export default TodoList;