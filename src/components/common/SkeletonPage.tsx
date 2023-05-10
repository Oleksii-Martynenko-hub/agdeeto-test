import React from 'react';
import styled from 'styled-components';

interface Props {
  title?: string;
}

const SkeletonPage: React.FC<Props> = ({ title, children }) => (
  <SkeletonPageStyled>
    {title && <Title>{title}</Title>}
    <Main>{children}</Main>
  </SkeletonPageStyled>
);

const Title = styled.h1`
  min-height: 50px;
  margin: 0;
  padding: 0 27px 0 20px;
  padding: 15px 20px 10px 20px;
  color: #272B41;
  font-weight: 500;
  font-size: 16px;
  border-bottom: 1px solid #f1f2f6;
  overflow: auto hidden;
  -webkit-overflow-scrolling: touch;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 46px;
    border-radius: 10px;
    box-shadow: inset -30px 0 12px #fff;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Main = styled.main`
  min-height: 200px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  padding: 15px 20px 20px;
`;

const SkeletonPageStyled = styled.div`
  width: 100%;
  max-width: 556px;
  position: relative;
  background: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 5px 20px rgba(146, 153, 184, 0.012);
`;

export default SkeletonPage;
