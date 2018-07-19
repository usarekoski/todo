import * as React from 'react';
import styled from 'styled-components';
import { baseStyles, typography } from '../styles';

const H1 = styled.h1`
  ${baseStyles}
  text-align: center;
  font-size: ${typography.fontSizes.displayLarge};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.displayLarge};
`;

export default function Header() {
  return <H1>Todo</H1>;
}
