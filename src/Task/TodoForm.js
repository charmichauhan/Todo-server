import React, { Component } from 'react';

class TodoForm extends Component {

    render() {
        const { data, onChange, onSave } = this.props;

        return (
            <div className="todo-form">
                <div className="todoListMain">
                    <div className="header">
                        <input 
                            style={{margin: '10px'}}
                            type="text"
                            placeholder="Enter item"
                            value={data.todo}
                            onChange={(e) => onChange('todo', e.target.value)}
                        />
                        <input 
                            type="date"
                            value={data.date}
                            onChange={(e) => onChange('date', e.target.value)}
                        />
                        <button onClick={onSave}> save </button>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

export default TodoForm;