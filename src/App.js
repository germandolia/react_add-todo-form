import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

export class App extends React.Component {
  state = {
    preparedTodos: todos.map(todo => ({
      ...todo,
      userName: users.find(person => person.id === todo.userId).name,
    })),
    todoUserId: '',
    todoTitle: '',
  }

  handleTitle = (e) => {
    if (!e.target.value || /^\s+$/.test(e.target.value)) {
      e.target.setCustomValidity('Please enter a todo title');
    } else {
      e.target.setCustomValidity('');
    }

    this.setState({
      todoTitle: e.target.value,
    });
  };

  handleUser = (e) => {
    this.setState({
      todoUserId: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    this.setState(({ preparedTodos, todoUserId, todoTitle }) => ({
      preparedTodos: [
        ...preparedTodos,
        {
          todoUserId: +todoUserId,
          id: preparedTodos.length + 1,
          title: todoTitle,
          userName: users.find(user => user.id === +todoUserId).name,
        },
      ],
      todoUserId: '',
      todoTitle: '',
    }));
  }

  render() {
    const { preparedTodos, todoTitle, todoUserId } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div className="App__todos">
          <NewTodo
            todoTitle={todoTitle}
            handleTitle={this.handleTitle}
            todoUserId={todoUserId}
            handleUser={this.handleUser}
            onSubmit={this.onSubmit}
          />
          <TodoList todos={preparedTodos} />
        </div>
      </div>
    );
  }
}
