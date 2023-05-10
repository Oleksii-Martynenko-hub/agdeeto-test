import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { createLocationActions } from '@/store/actions/create-location';
import { locationActions } from '@/store/actions/location';

import Button from '@/components/common/Button';
import SkeletonPage from '@/components/common/SkeletonPage';
import { PATH } from '@/containers/App';

const PageNotFound: React.FC = () => {
  const dispatch = useDispatch();

  const handleClickResetState = () => {
    dispatch(createLocationActions.reset());
    dispatch(locationActions.reset());
  };

  return (
    <SkeletonPage>
      <PageNotFoundStyled>
        <FourNullFour data-heading="404">404</FourNullFour>

        <Title>Ouch, something wrong, can&apos;t not found page</Title>

        <WrapMessage>
          <Message>We recommend that you check link is correct.</Message>
          <ImageUrlPlace />
          <Message left>Also that you can just create a new location.</Message>
        </WrapMessage>

        <Button customStyled={BtnBackCreate} onclick={handleClickResetState}>
          <NavLink to={PATH.ROOT}>Go to Create</NavLink>
        </Button>
      </PageNotFoundStyled>
    </SkeletonPage>
  );
};

const BtnBackCreate = css`
  border-radius: 40px;
`;

const PageNotFoundStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  perspective: 500px;
  perspective-origin: 50% 34%;
`;

const FourNullFour = styled.h2`
  text-transform: uppercase;
  font-size: 160px;
  line-height: 160px;
  margin: 0 0 60px;
  position: relative;
  text-rendering: optimizeLegibility;
  font-weight: 900;
  color: rgba(233, 63, 63, 0.65);
  text-shadow: 1px 4px 6px #e6e2df, 0 0 0 #66303a, 1px 4px 6px #e6e2df;
  transform: rotateY(18deg);
  white-space: nowrap;
  
  &::before {
    content: attr(data-heading);
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 1;
    text-shadow: 2px -1px 6px rgba(0,0,0,0.2);
    width: 100%;
    height: 60%;
    color: #dcdbda;
    transform: translate(10px,2px) skew(-13deg) scale(1,0.95);
  }
  
  &::after {
    content: attr(data-heading);
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    text-shadow: 2px -1px 6px rgba(0,0,0,0.3);
    z-index: 1;
    color: #fbf7f4;
    transform: translate(-4px,0) skew(13deg) scale(1,0.95);
    clip-path: polygon(0 60%,100% 60%,100% 100%,0 100%);
  }
`;
const Title = styled.h3`
  font-size: 27px;
  line-height: 26px;
  letter-spacing: -1px;
  margin: 0 0 60px;
  color: #2c2c2c;
  text-shadow: 1px 1px 2px grey;
`;

const WrapMessage = styled.div`
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -1px;
  margin: 0;
`;

const Message = styled.p<{ left?: boolean }>`
  margin: ${({ left }) => (left ? '0 auto 20px 0' : '0 0 20px auto')};
  padding: ${({ left }) => (left ? '0 0 0 7px' : '0 7px 0 0')};
  width: 180px;
  text-align: ${({ left }) => (left ? 'left' : 'right')};
  text-shadow: 1px 0 2px grey;
  position: relative;

  &::after {
    content: '';
    width: 70px;
    height: 56px;
    background: url('/assets/arrow-180deg.png') center no-repeat;
    position: absolute;
    background-size: contain;
    transform: ${({ left }) => (`rotateY(${left ? '0' : '180'}deg) rotateZ(-20deg)`)};
    top: 0;
    left: ${({ left }) => (left ? '170px' : '-90px')};
  }
`;

const ImageUrlPlace = styled.div`
  margin: 0 0 70px;
  width: 310px;
  height: 50px;
  background: url('/assets/place-url-address.png') center no-repeat;
  background-size: contain;
`;

export default PageNotFound;
