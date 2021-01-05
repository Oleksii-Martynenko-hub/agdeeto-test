import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { selectFormPlaceValues } from '@/store/selectors/formPlace';
import { formPlaceActions } from '@/store/actions/formPlace';
import PlaceSearch from './PlaceSearch';
import MapGoogle from './MapGoogle';
import InputPhoto from './UploadPhoto';

interface Props {}

const FormPlace: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const values = useSelector(selectFormPlaceValues);

  const submitHandler = (): void => {
    // const dispatch = useDispatch();
    dispatch(formPlaceActions.setValues(values));
    console.log(values);
  };

  return (
    <FormPlaceStyled>
      <PlaceSearch />
      <Description placeholder="Description your location" />
      <MapGoogle />
      <InputPhoto />
      <Button onClick={submitHandler} type="button">submit</Button>
    </FormPlaceStyled>
  );
};

const FormPlaceStyled = styled.form`
  width: 100%;
  height: 100%;
  padding: 22px;
  display: flex;
  flex-flow: nowrap column;
`;
const Description = styled.textarea`
  width: 100%;
  height: 15%;
  min-height: 80px;
  max-height: 200px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #a8a8a8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  outline: none;
  resize: none;
  &:focus {
    border: 1px solid #2f6ad6;
  }
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  line-height: 36px;
  border: 1px solid #a8a8a8;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  text-align: center;
  outline: none;
`;

export default FormPlace;
