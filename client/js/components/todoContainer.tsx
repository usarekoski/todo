import * as React from 'react';
import styled from 'styled-components';
import { Actions } from '../actions/todoActions';
import TodoStore from '../stores/todoStore';
import { SaveStatus, Todo } from '../types';
import Tabs from './tabs';
import TodoForm from './todoForm';
import TodoList from './todoList';

import SaveTodos from './saveTodos';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 0 30px #ccc;
  margin-bottom: 50px;
  border-radius: 2px;
`;

const tabs = ['ACTIVE', 'DONE', 'ALL'];

type TodoContainerState = {
  todos: Todo[];
  saveId: string;
  selected: string;
  saveStatus: string,
};

class TodoContainer extends React.Component<{}, TodoContainerState> {

  unsubscribe: null | (() => void) = null;

  constructor(props: {}) {
    super(props);

    const { todos, saveId } = TodoStore.getState();
    this.state = {
      todos,
      saveId,
      selected: tabs[2],
      saveStatus: 'No changes',
    };

    // Check the url when user loads the page.
    this.handleUrlId();
    this.handleTabClick = this.handleTabClick.bind(this);
    this.getTodos = this.getTodos.bind(this);
  }

  getTodos() {
    const { todos, saveId} = TodoStore.getState();
    this.setState({
      todos,
      saveId,
      saveStatus: this.createSaveStatus(todos),
    });
  }

  componentDidMount() {
    this.unsubscribe = TodoStore.subscribe(this.getTodos);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  createSaveStatus(todos: Todo[]) {
    if (todos.some((todo) => todo.saveStatus !== SaveStatus.Saved)) {
      return 'Unsaved changes';
    }
    return 'No changes';
  }

  handleUrlId() {
    const hash = window.location.hash;
    if (hash !== '') {
      Actions.loadTodos(TodoStore, hash.slice(1));
    }
  }

  handleTabClick = (text: string) => {
    this.setState({selected: text});
  }

  render() {

    const { todos, selected, saveId, saveStatus } = this.state;

    const saveURL = saveId !== '' ? window.location.href : '';

    const filteredTodos = todos.filter((todo) => {
      switch (selected) {
        case 'ACTIVE': return todo.done === false;
        case 'DONE': return todo.done === true;
        case 'ALL': return true;
      }
    });

    return (
      <Container className="todoContainer" >
        <SaveTodos saveURL={saveURL} saveStatus={saveStatus}/>
        <Tabs
          tabs={tabs}
          onClick={this.handleTabClick}
          active={selected}
        />
        <TodoForm />
        <TodoList todos = {filteredTodos} />
      </Container>
    );
  }

}

export default TodoContainer;
