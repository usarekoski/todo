import * as React from 'react';
import { Actions } from '../actions/todoActions';
import TodoStore from '../stores/todoStore';
import { Todo as TodoData } from '../types';
import Todo from './todo';

type Props = {
  todos: TodoData[];
};

class TodoList extends React.Component<Props, {}> {

  handleDeleteClick = (id: number) => {
    TodoStore.dispatch(Actions.deleteTodo(id));
  }

  handleDoneClick = (id: number) => {
    TodoStore.dispatch(Actions.markTodoDone(id));
  }

  render() {
    return (
      <div className="todoList">
        {this.props.todos.map((todo) => (
          <Todo
            key={todo.id}
            text={todo.text}
            done={todo.done}
            id={todo.id}
            onDoneClick={this.handleDoneClick}
            onDeleteClick={this.handleDeleteClick}
          />
        ))
        }
      </div>
    );
  }
}

export default TodoList;
