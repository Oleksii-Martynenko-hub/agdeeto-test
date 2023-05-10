import React from 'react';
import styled, { keyframes } from 'styled-components';

import SvgIcon from '@/components/common/SvgIcon';

interface Props {
  size?: number;
}

const Loader: React.FC<Props> = ({ size = 50 }) => (
  <Wrap>
    <LoaderSvgIcon size={size}>
      <SvgIcon icon="loader" />
    </LoaderSvgIcon>
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
  flex: 1 1 auto;
  position: relative;
  padding: 0;
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
  animation: 2s ${animationRotate} linear infinite;
`;

export default Loader;
