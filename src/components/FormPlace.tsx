import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
// import PlaceSearch from './PlaceSearch';
// import PlaceSearch2 from './PlaceSearch2';
import PlaceSearch3 from './PlaceSearch3';

interface Props {}

const FormPlace: React.FC<Props> = () => {
  // const getSelector = useSelector();
  // const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch();
  // };

  const submitHandler = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  return (
    <FormPlaceStyled>
      {/* <PlaceSearch /> */}
      {/* <PlaceSearch2 /> */}
      <PlaceSearch3 />
      <button onSubmit={submitHandler} type="submit">submit</button>
    </FormPlaceStyled>
  );
};

const FormPlaceStyled = styled.form`
  width: 100%;
  height: 100%;
  padding: 22px;
  & button {
    display: none;
  }
`;

export default FormPlace;
