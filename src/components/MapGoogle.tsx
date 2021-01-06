import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { selectFormPlaceValuesLatLng } from '@/store/selectors/formPlace';

interface Props {}

// const libraries: 'places'[] = ['places'];

const MapGoogle: React.FC<Props> = () => {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  //     ? process.env.REACT_APP_GOOGLE_MAP_API_KEY : '',
  //   // libraries,
  // });

  const LatLng = useSelector(selectFormPlaceValuesLatLng);

  return (
    <>
      {/* {loadError && <p>Error loading map...</p>}
      {!isLoaded && <p>Loading map...</p>} */}
      <GoogleMapStyled
        mapContainerStyle={{
          width: '100%',
          height: '50%',
          minHeight: '200px',
          maxHeight: '700px',
          border: '1px solid #a8a8a8',
          marginBottom: '20px',
        }}
        zoom={14}
        center={LatLng}
        options={{ disableDefaultUI: true, zoomControl: true }}
      >
        <Marker position={LatLng} />
      </GoogleMapStyled>
    </>
  );
};

const GoogleMapStyled = styled(GoogleMap)`  
`;

export default MapGoogle;
