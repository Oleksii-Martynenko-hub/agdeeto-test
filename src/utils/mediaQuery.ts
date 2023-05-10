/* eslint-disable import/prefer-default-export */
import { css, FlattenSimpleInterpolation } from 'styled-components';

export const mediaQuery = (screenBreakpoint = 768, values: FlattenSimpleInterpolation) => css`
  @media only screen and (min-width: ${screenBreakpoint}px) {
    ${values}
  }
`;
