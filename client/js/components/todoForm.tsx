import * as React from 'react';
import styled from 'styled-components';
import { Actions } from '../actions/todoActions';
import { colors, sizes, baseStyles } from '../styles';
import TodoStore from '../stores/todoStore';

const Form = styled.form`
  background-color: ${colors.secondary};
  display: flex;
`;

const Icon = styled.i`
  height: ${sizes.todoHeight};
  width: ${sizes.todoHeight};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gotn-weight: 900;
  color: ${colors.textInactive};
`;

const Input = styled.input`
  ${baseStyles}
  width: 100%;
  height: ${sizes.todoHeight};
  border: none;
  background-color: inherit;
  font-size: ${sizes.todoFontSize};
  padding: 0 10px;
  box-sizing: border-box;

  &:focus {
    border: none;
    outline: 0;
  }
`;

type State = {
  text: string;
};

export default class TodoForm extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = { text: '' };
  }

  handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  }

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    TodoStore.dispatch(Actions.createTodo(this.state.text));
    this.setState({ text: '' });
  }

  render() {
    return (
      <Form autoComplete="off" onSubmit={this.handleSubmit}>
        <Icon className="material-icons">chevron_right</Icon>
        <Input
          type="text"
          placeholder="Do stuff"
          value={this.state.text}
          onChange={this.handleTextChange}
         />
      </Form>
    );
  }

}
