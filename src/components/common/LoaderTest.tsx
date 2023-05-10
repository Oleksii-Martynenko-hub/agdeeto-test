import React from 'react';
import styled, { keyframes } from 'styled-components';

import SvgIcon from '@/components/common/SvgIcon';

interface Props {
  size?: number;
}

const Spinner: React.FC<Props> = ({ size = 50 }) => (
  <Wrap>
    <LoaderSvgIcon size={size}>
      <SvgIcon icon="loader" />
      <LoaderBody size={size} />
    </LoaderSvgIcon>
    <LoaderSvgIconSmall size={size / 2}>
      <SvgIcon icon="loader" />
      <LoaderBody size={size / 2} />
    </LoaderSvgIconSmall>
    <LoaderSvgIconSmallTwo size={size / 2}>
      <SvgIcon icon="loader" />
      <LoaderBody size={size / 2} />
    </LoaderSvgIconSmallTwo>
  </Wrap>
);

const animationRotate = keyframes({
  from: {
    transform: 'translate(-50%, -50%) rotate(0deg)',
  },
  to: {
    transform: 'translate(-50%, -50%) rotate(360deg)',
  },
});

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0;
`;

const LoaderBody = styled.div<{ size: number }>`
  width: ${({ size }) => (`${size / 1.35}px`)};
  height: ${({ size }) => (`${size / 1.35}px`)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: ${({ size }) => (`${size / 3.8}px solid #9395a0df`)};
  color: #9395a0;
`;

const LoaderSvgIcon = styled.div<{ size: number }>`
  width: ${({ size }) => (`${size}px`)};
  height: ${({ size }) => (`${size}px`)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #9395a0;
  z-index: 1;
  animation: 3s ${animationRotate} linear infinite;
`;

const LoaderSvgIconSmall = styled(LoaderSvgIcon)`
  top: ${({ size }) => (`calc(50% + ${size / 1.65}px)`)};
  left: ${({ size }) => (`calc(50% - ${size * 1.25}px)`)};
  animation: 1.5s ${animationRotate} linear infinite reverse;
`;

const LoaderSvgIconSmallTwo = styled(LoaderSvgIcon)`
  top: ${({ size }) => (`calc(50% - ${size / 1.65}px)`)};
  left: ${({ size }) => (`calc(50% + ${size * 1.25}px)`)};
  animation: 1.5s ${animationRotate} linear infinite reverse;
`;

export default Spinner;
