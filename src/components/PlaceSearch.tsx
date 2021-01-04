/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { selectFormPlaceValuesAddress } from '@/store/selectors/formPlace';
import { formPlaceActions } from '@/store/actions/formPlace';

interface Props {}

const PlaceSearch: React.FC<Props> = () => {
  const address = useSelector(selectFormPlaceValuesAddress);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (value: any) => {
    dispatch(formPlaceActions.setAddress(value));
  };

  const handleSelect = (value: any) => {
    geocodeByAddress(value)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => dispatch(formPlaceActions.setLatLng(latLng)))
      .catch((errorRes) => handleError(errorRes));
  };

  const handleError = (value: any) => {
    console.log(`myError -- ${value}`);
    switch (value) {
      case 'ZERO_RESULTS': setError('No result was found for this request.');
        break;
      default: setError('Error...!');
        break;
    }
  };

  return (
    <>
      <ErrorStyled>{error}</ErrorStyled>
      <PlaceSearchStyled value={address} onChange={handleChange} onSelect={handleSelect}>
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <SearchWrapStyled>
            <InputStyled {...getInputProps({ placeholder: 'Search place...' })} />
            <DropDownStyled>
              {loading && <LoaderStyled>Searching for places...</LoaderStyled>}
              {suggestions.map((suggestion) => (
                <ItemStyled
                  active={suggestion.active}
                  {...getSuggestionItemProps(suggestion)}
                >
                  {suggestion.description}
                </ItemStyled>
              ))}
            </DropDownStyled>
          </SearchWrapStyled>
        )}
      </PlaceSearchStyled>
    </>
  );
};

const PlaceSearchStyled = styled(PlacesAutocomplete)`
  border: 1px solid blue;
  width: 100%;
  display: block;
`;
const SearchWrapStyled = styled.div`
  border: 1px solid green;
  width: 100%;
  font-size: 20px;
  font-family: serif;
  display: block;
`;
const InputStyled = styled.input`
  border: 1px solid #ffae00;
  width: 100%;
  height: 50px;
  display: block;
`;
const DropDownStyled = styled.ul`
  border: 1px solid blue;
  width: 100%;
  margin: 0;
  display: block;
`;
const ItemStyled = styled.li<{active?: boolean}>`
  border: 1px solid black;
  background: ${({ active }) => (active ? '#a8a8a8' : '#fff')};
  width: 100%;
  height: 40px;
  margin: 0;
  display: block;
`;
const LoaderStyled = styled.li`
  border: 1px solid #91cce4;
  color: #91cce4;
`;
const ErrorStyled = styled.p`
  border: 1px solid red;
  color: red;
`;

export default PlaceSearch;
