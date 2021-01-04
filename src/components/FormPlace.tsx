import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PlaceSearch from './PlaceSearch';

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
      <PlaceSearch />
      <button onSubmit={submitHandler} type="submit">submit</button>
    </FormPlaceStyled>
  );
};

const FormPlaceStyled = styled.form``;

export default FormPlace;
