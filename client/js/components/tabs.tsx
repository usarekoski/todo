import * as React from 'react';
import styled from 'styled-components';
import { colors, typography, baseStyles } from '../styles';

const TabElem = styled.li`
  display: block;
  margin-right: 13px;
  height: 100%;
  width: 15%;
`;

const Button = styled<{ active: boolean }, any>('button')`
  ${baseStyles}
  font-size: ${typography.fontSizes.body};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.body};
  height: 100%;
  width: 100%;
  appearance: none;
  border: none;
  background-color: inherit;
  color: ${(props) => props.active ? colors.text : 'white'};
  background-color: ${(props) => props.active ? colors.secondary : 'inherit'};

  &:hover {
    color: ${colors.text};
    background-color: ${colors.secondary};
    cursor: pointer;
  }
`;

type TabProps = {
  text: string;
  active: boolean;
  onClick: (tab: string) => void;
};

class Tab extends React.Component<TabProps, {}> {

  handleClick = () => {
    this.props.onClick(this.props.text);
  }

  render() {
    const { active, text } = this.props;
    return (
      <TabElem>
        <Button onClick={this.handleClick} active={active}>
          {text}
        </Button>
      </TabElem>
    );
  }
}

type TabsProps = {
  active: string;
  tabs: string[];
  onClick: (tab: string) => void;
};

const TabList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  background-color: ${colors.primary};
  height: 40px;
  box-sizing: border-box;
  display: flex;
`;

function Tabs(props: TabsProps) {
  const { active, tabs, onClick } = props;

  return (
    <TabList>
      {tabs.map((text) => (
        <Tab
          key={text}
          text={text}
          onClick={onClick}
          active={active === text}
        />
      ))}
    </TabList>
  );
}

export default Tabs;
