import * as React from 'react';
import styled from 'styled-components';
import { Actions } from '../actions/todoActions';
import { colors, baseStyles, typography } from '../styles';
import TodoStore from '../stores/todoStore';

const Wrapper = styled.div`
  background-color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SaveButton = styled.button`
  font-family: ${typography.fontFamily.main};
  height: 30px;
  width: 100px;
  background-color: ${colors.primary};
  color: white;
  border: 2px solid white;
  border-radius: 15px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    color: ${colors.text};
    background-color: ${colors.secondary};
  }
`;

const SaveStatus = styled.span`
  ${baseStyles}
  color: ${colors.textInactive};
  margin: 0;
`;

type Props = {
  saveURL: string;
  saveStatus: string;
};

class SaveTodos extends React.Component<Props, {}> {

  handleSaveClick = () => {
    TodoStore.dispatch(Actions.saveTodos(TodoStore));
  }

  render() {
    return (
      <Wrapper>
        <SaveStatus>{this.props.saveStatus}</SaveStatus>
        <SaveButton onClick={this.handleSaveClick}>SAVE</SaveButton>
      </Wrapper>
    );
  }

}

export default SaveTodos;
