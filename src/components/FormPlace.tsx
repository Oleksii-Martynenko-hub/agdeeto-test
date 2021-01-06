import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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
    dispatch(formPlaceActions.setValues(values));
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    dispatch(formPlaceActions.setDescription(e.target.value));
  };

  return (
    <FormPlaceStyled>
      <PlaceSearch />
      <Description onChange={handleChange} placeholder="Description your location" />
      <MapGoogle />
      <InputPhoto />
      <Button onClick={submitHandler} type="button">
        <NavLink to="/createLocation">submit</NavLink>
      </Button>
    </FormPlaceStyled>
  );
};

const FormPlaceStyled = styled.form`
  width: 100%;
  height: 100%;  
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
  &>a {
    color: #000;
    text-decoration: none;
  }
`;

export default FormPlace;
