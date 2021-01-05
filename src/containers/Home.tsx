import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import FormPlace from '@/components/FormPlace';
import { selectFormPlaceValues } from '@/store/selectors/formPlace';

interface Props {}

const Home: React.FC<Props> = () => {
  const values = useSelector(selectFormPlaceValues);
  // const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch(authRestoreAsync());
    console.log(values);
  };

  return (
    <HomeStyled>
      <FormPlace />
      <button onClick={handleClick} type="submit">button</button>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  &>button {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;

export default Home;
