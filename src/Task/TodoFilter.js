import React, { Component } from 'react';

class TodoFilter extends Component {
    render() {
        const { onFilter } = this.props;
        const links = ['All', 'Completed', 'Pending'];
        return (
            <div className="todo-filter">
                {
                    links.map((link, id) => (
                        <button
                            key={id}
                            style={{ margin: '5px' }}
                            onClick={() => onFilter(link)}>
                            {link}
                        </button>
                    ))
                }
            </div>
        );
    }
}

export default TodoFilter;