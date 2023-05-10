import React from 'react';
import styled from 'styled-components';
import { sanitize } from 'dompurify';

import * as icons from '@/icon/icons.json';

export type Icons = keyof typeof icons;

interface Props {
  icon: Icons;
  viewBox?: string;
  fill?: 'none' | 'currentColor';
  stroke?: 'none' | 'currentColor';
  strokeWidth?: number;
  customStyles?: () => string;
}

const SvgIcon: React.FC<Props> = ({
  icon,
  viewBox = '0 0 24 24',
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2,
  customStyles = () => '',
}) => (
  <SvgIconStyled
    viewBox={viewBox}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    customStyles={customStyles}
  >
    <g dangerouslySetInnerHTML={{ __html: icons[icon] }} />
  </SvgIconStyled>
);

const SvgIconStyled = styled.svg<{ customStyles: () => string}>`
  display: block;  
  width: 100%;
  height: 100%;

  ${({ customStyles }) => customStyles()};
`;

export default SvgIcon;
