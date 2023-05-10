import React from 'react';
import styled, { keyframes } from 'styled-components';

import SvgIcon from '@/components/common/SvgIcon';

export const SuccessMessage: React.FC = () => (
  <SuccessMessageStyled>
    <SuccessSvgIcon>
      <SvgIcon icon="check-circle" />
    </SuccessSvgIcon>

    <Message>Your location has been successfully created</Message>
  </SuccessMessageStyled>
);

interface CopyProps {
  onAnimationEnd: () => void;
}

export const CopyToClipboardMessage: React.FC<CopyProps> = ({ onAnimationEnd }) => (
  <CopyMessageStyled onAnimationEnd={onAnimationEnd}>
    <CopySvgIcon>
      <SvgIcon icon="info" />
    </CopySvgIcon>

    <Message>Copied to clipboard</Message>
  </CopyMessageStyled>
);

interface ErrorPostLocationProps {
  onAnimationEnd: () => void;
  InvalidMessages: {mess: string, isValid: boolean}[];
}

export const ErrorPostLocationMessage: React.FC<ErrorPostLocationProps> = ({
  onAnimationEnd,
  InvalidMessages,
}) => (
  <ErrorPostLocationMessageStyled onAnimationEnd={onAnimationEnd}>
    <ErrorPostLocationSvgIcon>
      <SvgIcon icon="x-circle" />
    </ErrorPostLocationSvgIcon>

    {InvalidMessages.map(({ mess, isValid }, i) => (
      <Message key={`${i}${mess}`} isVisible={!isValid}>{mess}</Message>
    ))}
  </ErrorPostLocationMessageStyled>
);

export const ErrorMessage: React.FC = () => (
  <ErrorMessageStyled>
    <ErrorSvgIcon>
      <SvgIcon icon="x-circle" />
    </ErrorSvgIcon>

    <Message>Error create your location, something isn&apos;t right!</Message>
  </ErrorMessageStyled>
);

const animationFadeInRight = keyframes`
  0% { opacity: 0; transform: translateX(calc(-100% - 20px)) scaleX(2); }
  60% { opacity: 1; transform: translateX(calc(0% + 25px)) scaleX(1); }
  75% { transform: translateX(calc(0% - 10px)) scaleX(.98); }
  90% { transform: translateX(calc(0% + 5px)) scaleX(.995); }
  100% { transform: translateX(0%) scaleX(1); }
`;

const animationFadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(30px) scale(.6); }
  6% { opacity: 1; transform: translateY(-5px) scale(1.05); }
  7% { opacity: 1; transform: translateY(0px) scale(1); }
  93% { opacity: 1; transform: translateY(0px) scale(1); }
  94% { opacity: 1; transform: translateY(-5px) scale(1.05); }
  100% { opacity: 0; transform: translateY(30px) scale(.6); }
`;

const SuccessSvgIcon = styled.div`
  width: 70px;
  height: 100%;
`;

const CopySvgIcon = styled(SuccessSvgIcon)`
  margin-right: 5px;
  width: 40px;
`;

const ErrorPostLocationSvgIcon = styled(SuccessSvgIcon)`
  position: absolute;
  top: calc(50%);
  transform: translateY(-50%);
  left: 10px;
  height: calc(100% - 10px);
  max-height: 30px;
  width: 30px;
`;

const ErrorSvgIcon = styled(SuccessSvgIcon)``;

const Message = styled.p<{ isVisible?: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  line-height: 20px;
  text-align: center;
  margin: 0;
  font-weight: 500;
  width: 100%;
`;

const SuccessMessageStyled = styled.div`
  font-size: 17px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 15px;
  color: ${({ theme }) => (theme.palette.green)};
  border: 1px dashed ${({ theme }) => (theme.palette.green)};
  border-radius: 4px;
  transform: translateX(calc(-100% - 20px));
  animation: ${animationFadeInRight} 0.3s cubic-bezier(.215,.61,.355,1) 1s forwards;

`;

const CopyMessageStyled = styled.div`
  background: ${({ theme }) => (theme.palette.blue)};
  display: flex;
  align-items: center;
  pointer-events: none;
  border-radius: 4px;
  font-size: 12px;
  width: 170px;
  padding: 5px 7px;
  height: 35px;
  opacity: 0;
  position: absolute;
  bottom: 125px;
  left: 27px;
  color: #fff;
  animation: ${animationFadeInOut} 5s cubic-bezier(.215,.61,.355,1) 0s forwards;

  &::after {
    content: '';
    position: absolute;
    display: block;
    bottom: -10px;
    right: 32px;
    border: 7px solid transparent;
    border-top: 10px solid ${({ theme }) => (theme.palette.blue)};
    border-bottom: none;
  }
`;

const ErrorPostLocationMessageStyled = styled.div`
  background: ${({ theme }) => (theme.palette.red)};
  display: flex;
  flex-flow: column;
  pointer-events: none;
  border-radius: 4px;
  font-size: 12px;
  width: 262px;
  padding: 7px 7px 7px 37px;
  opacity: 0;
  position: absolute;
  bottom: 75px;
  left: 20px;
  color: #fff;
  z-index: 10;
  animation: ${animationFadeInOut} 5s cubic-bezier(.215,.61,.355,1) 0s forwards;

  &::after {
    content: '';
    position: absolute;
    display: block;
    bottom: -10px;
    right: 32px;
    border: 7px solid transparent;
    border-top: 10px solid ${({ theme }) => (theme.palette.red)};
    border-bottom: none;
  }
`;

const ErrorMessageStyled = styled(SuccessMessageStyled)`
  color: ${({ theme }) => (theme.palette.red)};
  border: 1px dashed ${({ theme }) => (theme.palette.red)};
`;
