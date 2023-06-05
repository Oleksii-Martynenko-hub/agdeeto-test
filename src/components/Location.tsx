import { selectFormPlaceValues } from '@/store/selectors/formPlace';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MapGoogle from './MapGoogle';
import PhotosSlider from './PhotosSlider';

interface Props {}

const Location: React.FC<Props> = () => {
  const { address, description } = useSelector(selectFormPlaceValues);

  return (
    <LocationStyled>
      <PhotosSlider />
      <AddressStyled>{address}</AddressStyled>
      <DescriptionStyled>{description}</DescriptionStyled>
      <MapGoogle />
    </LocationStyled>
  );
};

const LocationStyled = styled.div`
  width: 100%;
  height: 100vh;
  padding: 22px;
  min-height: 100vh;
  max-height: 100%;
  position: relative;  
  background: linear-gradient(to bottom, #ececff, #cbf7ff, #e1ffeb);
`;
const AddressStyled = styled.h1`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0 20px 0;
`;
const DescriptionStyled = styled.p`
  max-height: 100px;
  margin: 0 0 14px 0;
  padding: 3px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  overflow: hidden auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Location;
