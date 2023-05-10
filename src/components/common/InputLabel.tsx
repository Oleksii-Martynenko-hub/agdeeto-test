import React from 'react';
import styled, {
  keyframes,
  FlattenSimpleInterpolation,
  FlattenInterpolation,
  ThemeProps,
} from 'styled-components';

import { gradientAnimation } from '@/utils/transition-animation';
import SvgIcon, { Icons } from './SvgIcon';

export type CustomStyled =
  | FlattenSimpleInterpolation
  | FlattenInterpolation<ThemeProps<any>>
  | undefined;

interface Props {
  required?: boolean;
  unwrap?: boolean;
  isValid?: boolean;
  left?: number;
  icon?: Icons;
  iconEye?: [boolean, boolean, () => void];
  customStyled?: CustomStyled;
}

const InputLabel: React.FC<Props> = ({
  children,
  required,
  unwrap,
  customStyled,
  isValid,
  icon,
  iconEye = [false, false],
  left = 50,
}) => (
  <InputLabelStyled customStyled={customStyled} unwrap={unwrap}>
    {children}
    {required && (
      <>
        <Required isValid={isValid} left={left}>
          {isValid ? <Valid /> : <NotValid>*</NotValid>}
        </Required>

        {icon && (
          <InputSvgIcon>
            <SvgIcon icon={icon || 'x'} />
          </InputSvgIcon>
        )}
        {iconEye[0] && (
          <EyeSvgIcon onClick={iconEye[2]}>
            <SvgIcon icon={iconEye[1] ? 'eye-off' : 'eye'} />
          </EyeSvgIcon>
        )}
      </>
    )}
  </InputLabelStyled>
);

const animation = (color: string) => keyframes`${gradientAnimation(color)}`;

const NotValid = styled.span`
  display: block;
  color: ${({ theme }) => (`${theme.palette.red}`)};
`;

const EyeSvgIcon = styled.div`
  position: absolute;
  bottom: -1px;
  right: 0;
  width: 40px;
  height: 40px;
  padding: 10px;
`;

const InputSvgIcon = styled.div`
  position: absolute;
  bottom: 9px;
  left: 12px;
  width: 20px;
  height: 20px;
`;

const Valid = styled.span`
  display: block;
  width: 30px;
  height: 30px;
  top: -1px;
  left: 0;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 7px;
    display: block;
    width: 10px;
    height: 4px;
    transform: rotate(65deg);
    clip-path: polygon(0 0, 84% 20%, 100% 75%, 0 100%);
    animation: ${({ theme }) => (animation(theme.palette.green))} 0.25s linear 0s forwards;
  }

  &::after {
    top: 6px;
    left: 2px;
    width: 14px;
    height: 3px;
    transform: rotate(-57deg);
    clip-path: polygon(10% 0%, 100% 45%, 100% 55%, 2% 91%);
    animation: ${({ theme }) => (animation(theme.palette.green))} 0.25s linear 0.25s forwards;
  }
`;

const Required = styled.div<{ isValid?: boolean, left: number }>`
  position: absolute;
  top: -1px;
  left: ${({ left }) => (left)}px;
`;

const InputLabelStyled = styled.label<{ customStyled: CustomStyled, unwrap?: boolean }>`
  position: relative;
  display: block;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: ${({ unwrap }) => (unwrap ? '0' : '20px')};

  & > span {
    margin-bottom: 6px;
    padding: 0 0 0 4px;
    display: block;
  }

  ${({ customStyled }) => (customStyled)}
`;

export default InputLabel;
