import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { selectFormPlaceValuesAddress } from '@/store/selectors/formPlace';

interface Props {}

const PlaceSearch: React.FC<Props> = () => {
  const address = !!useSelector(selectFormPlaceValuesAddress);
  const dispatch = useDispatch();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e: { target: { value: string; }; }) => {
    setValue(e.target.value);
    dispatch(formPlaceActions.setAddress(e.target.value));
  };

  const handleSelect = (val: any) => {
    setValue(val, true);
    dispatch(formPlaceActions.setAddress(val));

    getGeocode({ address: val })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => dispatch(formPlaceActions.setLatLng({ lat, lng })))
      .catch((errorRes) => console.log('😱 Error: ', errorRes));
  };

  return (
    <PlaceSearchStyled onSelect={handleSelect}>
      <InputStyled
        active={address}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search your location"
      />
      <PopoverStyled>
        <DropDownStyled>
          {status === 'OK'
            ? data.map(({ place_id, description }) => (
              <ItemStyled key={place_id} value={description} />
            )) : <DefaultItemStyled value={status ? 'Not found location' : 'Loading locations...'} />}
        </DropDownStyled>
      </PopoverStyled>
    </PlaceSearchStyled>
  );
};

const PlaceSearchStyled = styled(Combobox)`
  width: 100%;
  display: block;
  position: relative;
  z-index: 5;
  margin-bottom: 20px;
`;
const PopoverStyled = styled(ComboboxPopover)`
  width: 100%;
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: block;
  `;
const InputStyled = styled(ComboboxInput)<{active: boolean}>`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 18px;
  width: 100%;
  height: 40px;
  padding: 10px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom-left-radius: ${({ active }) => (active ? '0px' : '6px')};
  border-bottom-right-radius: ${({ active }) => (active ? '0px' : '6px')};
  border: 1px solid #a8a8a8;
  display: block;
  outline: none;
  &:focus {
    border: 1px solid #2f6ad6;
  }
`;
const DropDownStyled = styled(ComboboxList)`
  width: 100%;
  border: 1px solid #2f6ad6;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background: #fff;
  border-top: none;
  margin: 0;
  padding: 0 10px 0 7px;
  display: block;
`;
const ItemStyled = styled(ComboboxOption)`
  background: #fff;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 0px 0 0px 22px;
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
    top: 5px;
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
    top: 14px;
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
      background: #1f2a3d;
      border: 5px solid rgba(255, 0, 0, 1);
    }
    &::after {
      background: rgba(255, 0, 0, 1);
    }
  }
`;
const DefaultItemStyled = styled(ItemStyled)`
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 3px;
    width: 11px;
    height: 1px;
    background: rgba(0, 0, 0, 0.7);
    border: none;
  }
  &::after {
    display: none;
  }
  &[aria-selected="true"],
  &:hover {
    color: #000;
    &::before {
      background: #000;
      border: none;
    }
    &::after {
      display: none;
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
