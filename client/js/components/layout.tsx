import * as React from 'react';
import styled from 'styled-components';
import Header from './header';
import TodoContainer from './todoContainer';

function Layout() {
  return (
      <>
        <Header />
        <TodoContainer />
      </>
  );
}

export default (Layout);
