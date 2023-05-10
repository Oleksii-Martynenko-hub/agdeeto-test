/* global google */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { ICoordinates } from '@/store/reducers/create-location';

interface Props {
  coordinates: ICoordinates;
  onclick?: () => void;
}

const GoogleMapLocationList: React.FC<Props> = ({ coordinates, onclick }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  const iconMarker = {
    url: '/assets/marker.png',
    scaledSize: new google.maps.Size(38, 38),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(19, 38),
  };

  const markerLoad = useCallback((marker: google.maps.Marker) => {
    if (marker) {
      marker.setIcon(iconMarker);
    }
  }, []);

  return (
    <WrapGoogleMap>
      <GoogleMap
        onClick={onclick}
        mapContainerStyle={containerStyle}
        zoom={15}
        center={coordinates}
        options={{ disableDefaultUI: true, zoomControl: false, gestureHandling: 'none' }}
        clickableIcons={false}
      >
        <Marker
          onLoad={markerLoad}
          position={coordinates}
        />
      </GoogleMap>
    </WrapGoogleMap>
  );
};

const WrapGoogleMap = styled.div`
  width: 100%;
  height: 130px;
  padding: 0;
  border: 1px solid #e3e6ef;
  border-radius: 4px;
  margin: 0 0 10px 0;

  &:hover {
    border: 1px solid ${({ theme }) => (theme.palette.blue)};
  }
`;

export default GoogleMapLocationList;
