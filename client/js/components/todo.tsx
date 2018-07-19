import * as React from 'react';
import styled from 'styled-components';
import { colors, sizes, baseStyles } from '../styles';

const Container = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${colors.secondary};
`;

const DoneCheckbox = styled.input`
  display: none;
`;

const Icon = styled.i`
  height: ${sizes.todoHeight};
  width: ${sizes.todoHeight};
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: 900;
`;

const Content = styled<{ done: boolean }, any>('span')`
  ${baseStyles}
  font-size: ${sizes.todoFontSize};
  margin-left: 10px;
  width: 85%;
  text-decoration: ${({ done }) => done ? 'line-through' : 'none'};
  color: ${({ done }) => done ? colors.textInactive : 'inherit'};
`;

const Remove = styled.a`
  color: white;
  height: $${sizes.todoHeight};
  width: ${sizes.todoHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: ${colors.textInactive};
  }
`;

type Props = {
  text: string;
  done: boolean;
  id: number;
  onDeleteClick: (id: number) => void;
  onDoneClick: (id: number) => void;
};

export default class Todo extends React.Component<Props, {}> {

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.id);
  }

  handleDoneClick = () => {
    this.props.onDoneClick(this.props.id);
  }

  render() {
    const { text, done } = this.props;

    return (
      <Container>
        <label >
          <DoneCheckbox
            type="checkbox"
            onChange={this.handleDoneClick}
            checked={done}
          />
          <Icon
            color={done ? colors.primary : colors.secondary}
            className="material-icons"
          >
            done
          </Icon>
        </label>
        <Content done={done}>{text}</Content>
        <Remove onClick={this.handleDeleteClick}>
          <Icon color={colors.secondary} className="material-icons" >
            clear
          </Icon>
        </Remove>
      </Container>
    );
  }
}
