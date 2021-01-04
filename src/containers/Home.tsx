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
      <button onClick={handleClick} type="submit">button</button>
      <FormPlace />
    </HomeStyled>
  );
};

const HomeStyled = styled.div``;

export default Home;
