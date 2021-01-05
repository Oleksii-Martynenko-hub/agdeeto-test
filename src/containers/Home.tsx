import React from 'react';
import styled from 'styled-components';

import FormPlace from '@/components/FormPlace';

interface Props {}

const Home: React.FC<Props> = () =>
<HomeStyled>
  <FormPlace />
</HomeStyled>

const HomeStyled = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  max-height: 100%;
  position: relative;  
  background: linear-gradient(to bottom, #ececff, #cbf7ff, #e1ffeb);
`;

export default Home;
