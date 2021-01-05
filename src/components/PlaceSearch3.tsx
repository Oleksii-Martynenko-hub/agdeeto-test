import React from 'react';
import { useDispatch } from 'react-redux';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import styled from 'styled-components';

import { formPlaceActions } from '@/store/actions/formPlace';

interface Props {}

const PlaceSearch: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e: { target: { value: string; }; }) => {
    setValue(e.target.value);
    // console.log(e.target.value);
    dispatch(formPlaceActions.setAddress(e.target.value));
  };

  const handleSelect = (val: any) => {
    setValue(val, false);
    // console.log(val);
    dispatch(formPlaceActions.setAddress(val));

    getGeocode({ address: val })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        // console.log('📍 Coordinates: ', { lat, lng });
        dispatch(formPlaceActions.setLatLng({ lat, lng }));
      })
      .catch((errorRes) => {
        console.log('😱 Error: ', errorRes);
        // handleError(errorRes);
      });
  };

  return (
    <PlaceSearchStyled onSelect={handleSelect}>
      <InputStyled value={value} onChange={handleInput} disabled={!ready} />
      <PopoverStyled>
        <DropDownStyled>
          {status === 'OK'
          && data.map(({ place_id, description }) => (
            <ItemStyled key={place_id} value={description} />
          ))}
        </DropDownStyled>
      </PopoverStyled>
    </PlaceSearchStyled>
  );
};

const PlaceSearchStyled = styled(Combobox)`
  width: 100%;
  display: block;
`;
const PopoverStyled = styled(ComboboxPopover)`
  width: 100%;
  font-size: 15px;
  font-family: serif;
  display: block;
  `;
const InputStyled = styled(ComboboxInput)`
  font-size: 20px;
  width: 100%;
  height: 50px;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border: 1px solid #a8a8a8;
  display: block;
  outline: none;
`;
const DropDownStyled = styled(ComboboxList)`
  width: 100%;
  border: 1px solid #a8a8a8;
  border-top: none;
  margin: 0;
  padding: 0 10px 0 7px;
  display: block;
`;
const ItemStyled = styled(ComboboxOption)`
  background: #fff;
  width: 100%;
  height: 40px;
  margin: 0;
  padding: 10px 0 10px 22px;
  display: block;
  color: rgba(0, 0, 0, 0.7);  
  overflow: auto hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  cursor: pointer;
  outline: none;
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 1px;
    width: 5px;
    height: 5px;
    background: transparent;
    border: 5px solid rgba(255, 0, 0, 1);
    border-radius: 50%;
  }
  &::after {
    border-radius: 0;
    border: none;
    border-top-left-radius: 7px;
    top: 19px;
    left: 5px;
    width: 7px;
    height: 7px;
    background: rgba(255, 0, 0, 1);
    transform: rotate(45deg);
  }
  &[aria-selected="true"],
  &:hover {
    color: #000;
    &::before {
      background: #000;
      border: 5px solid rgba(255, 0, 0, 1);
    }
    &::after {
      background: rgba(255, 0, 0, 1);
    }
  }
`;
// const LoaderStyled = styled.li`
//   border: 1px solid #91cce4;
//   color: #91cce4;
// `;
// const ErrorStyled = styled.p`
//   border: 1px solid red;
//   color: red;
// `;

export default PlaceSearch;
