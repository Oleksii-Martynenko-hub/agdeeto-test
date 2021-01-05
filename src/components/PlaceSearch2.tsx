/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
// import styled from 'styled-components';
// import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// import { selectFormPlaceValuesAddress } from '@/store/selectors/formPlace';
import { formPlaceActions } from '@/store/actions/formPlace';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

interface Props {}

const PlaceSearch: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleChange = (e: { target: { value: string; }; }) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    console.log(e.target.value);
    dispatch(formPlaceActions.setAddress(e.target.value));
  };

  const handlerKeyDownSuggestions = (event: React.KeyboardEvent<HTMLUListElement>): void => {
    switch (event.key) {
      case 'ArrowUp': console.log('up');
        break;
      case 'ArrowDown': console.log('down');
        break;
      default:
        break;
    }
  };

  const handleSelect = ({ description }: { description: string }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    console.log(description);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => {
        console.log(results);
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng });
        dispatch(formPlaceActions.setLatLng({ lat, lng }));
      })
      .catch((errorRes) => {
        console.log('😱 Error: ', errorRes);
        // handleError(errorRes);
      });
  };

  const renderSuggestions = () => data.map((suggestion) => {
    console.log(suggestion);
    const {
      place_id,
      structured_formatting: { main_text, secondary_text },
    } = suggestion;

    return (
      <li key={place_id} onClick={handleSelect(suggestion)}>
        <strong>{main_text}</strong>
        <small>{secondary_text}</small>
      </li>
    );
  });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {status === 'OK' && <ul onKeyDown={handlerKeyDownSuggestions}>{renderSuggestions()}</ul>}
    </div>
  );
};

// const PlaceSearchStyled = styled(PlacesAutocomplete)`
//   border: 1px solid blue;
//   width: 100%;
//   display: block;
// `;
// const SearchWrapStyled = styled.div`
//   border: 1px solid green;
//   width: 100%;
//   font-size: 20px;
//   font-family: serif;
//   display: block;
// `;
// const InputStyled = styled.input`
//   border: 1px solid #ffae00;
//   width: 100%;
//   height: 50px;
//   display: block;
// `;
// const DropDownStyled = styled.ul`
//   border: 1px solid blue;
//   width: 100%;
//   margin: 0;
//   display: block;
// `;
// const ItemStyled = styled.li<{active?: boolean}>`
//   border: 1px solid black;
//   background: ${({ active }) => (active ? '#a8a8a8' : '#fff')};
//   width: 100%;
//   height: 40px;
//   margin: 0;
//   display: block;
// `;
// const LoaderStyled = styled.li`
//   border: 1px solid #91cce4;
//   color: #91cce4;
// `;
// const ErrorStyled = styled.p`
//   border: 1px solid red;
//   color: red;
// `;

export default PlaceSearch;
